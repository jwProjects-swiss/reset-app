import { useCallback, useEffect, useRef, useState } from 'react'
import { ACHIEVEMENTS } from '../data/achievements'
import { CATEGORY_BY_ID } from '../data/categories'
import { DONE_MESSAGES, pick } from '../data/messages'
import { chime, keepAwake, prepareSound, vibrate } from '../lib/feedback'
import { formatDuration, pickChallenge } from '../lib/picker'
import { newId, useStore } from '../lib/store'
import type { ActiveChallenge, Effect } from '../types'
import { ClockIcon, CloseIcon } from './Icons'
import { TimerRing } from './TimerRing'
import { Button } from './ui'

type Phase = 'offer' | 'run' | 'done'

interface Done {
  entryId: string
  at: number
  message: string
}

export function ChallengeFlow({ first, onClose }: { first: ActiveChallenge; onClose: () => void }) {
  const { state, dispatch } = useStore()
  const [challenge, setChallenge] = useState(first)
  const [round, setRound] = useState(0)
  const [phase, setPhase] = useState<Phase>('offer')
  const [done, setDone] = useState<Done | null>(null)
  const [effect, setEffect] = useState<Effect | null>(null)

  // Timer: Wir merken uns den Endzeitpunkt. So stimmt die Zeit auch,
  // wenn das Gerät zwischendurch gesperrt war.
  const [remaining, setRemaining] = useState(0)
  const [running, setRunning] = useState(false)
  const endAt = useRef(0)
  const releaseWake = useRef<() => void>(() => {})

  const category = CATEGORY_BY_ID[challenge.category]
  const total = (challenge.seconds ?? 0) * 1000

  const complete = useCallback(() => {
    const entry = {
      id: newId(),
      challengeId: challenge.id,
      category: challenge.category,
      at: Date.now(),
      effect: null,
    }
    dispatch({ type: 'complete', entry })
    setDone({ entryId: entry.id, at: entry.at, message: pick(DONE_MESSAGES) })
    setEffect(null)
    setRunning(false)
    setPhase('done')
  }, [challenge, dispatch])

  useEffect(() => {
    if (phase !== 'run' || !running) return
    const id = setInterval(() => {
      const left = endAt.current - Date.now()
      if (left > 0) {
        setRemaining(left)
        return
      }
      clearInterval(id)
      setRemaining(0)
      if (state.settings.sound) chime()
      if (state.settings.vibration) vibrate([180, 90, 180])
      complete()
    }, 200)
    return () => clearInterval(id)
  }, [phase, running, complete, state.settings.sound, state.settings.vibration])

  // Bildschirm nur wach halten, solange ein Timer läuft
  useEffect(() => {
    if (phase !== 'run') return
    let cancelled = false
    void keepAwake().then((release) => {
      if (cancelled) release()
      else releaseWake.current = release
    })
    return () => {
      cancelled = true
      releaseWake.current()
      releaseWake.current = () => {}
    }
  }, [phase])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function startTimer() {
    if (state.settings.sound) prepareSound()
    endAt.current = Date.now() + total
    setRemaining(total)
    setRunning(true)
    setPhase('run')
  }

  function togglePause() {
    if (running) {
      setRemaining(Math.max(0, endAt.current - Date.now()))
      setRunning(false)
    } else {
      endAt.current = Date.now() + remaining
      setRunning(true)
    }
  }

  function another(options: { skipped: boolean; withoutMovement?: boolean }) {
    if (options.skipped) dispatch({ type: 'skip' })
    setChallenge(pickChallenge(state, options.withoutMovement ? 'bewegung' : undefined))
    setRound((r) => r + 1)
    setRunning(false)
    setPhase('offer')
  }

  function answer(value: Effect) {
    if (!done) return
    setEffect(value)
    dispatch({ type: 'effect', entryId: done.entryId, effect: value })
  }

  const fresh = done ? ACHIEVEMENTS.filter((a) => (state.unlocked[a.id] ?? 0) >= done.at) : []

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Challenge"
      className="fade-in fixed inset-0 z-50 bg-bg"
      style={{
        backgroundImage: `radial-gradient(130% 55% at 50% 0%, color-mix(in srgb, ${
          phase === 'done' ? 'var(--color-dawn)' : category.color
        } 20%, transparent), transparent)`,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="gutter mx-auto flex h-full max-w-md flex-col pt-3 pb-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Schliessen"
            className="grid size-11 place-items-center rounded-full bg-raised/70 text-muted transition-colors hover:text-ink"
          >
            <CloseIcon width={20} height={20} />
          </button>
        </div>

        {phase === 'offer' && (
          <div key={`offer-${round}`} className="flex min-h-0 flex-1 flex-col">
            <div className="scroll-area flex min-h-0 flex-1 flex-col">
              <div className="rise-in my-auto flex shrink-0 flex-col gap-5 py-6">
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                <span
                  className="rounded-full px-3 py-1 text-night"
                  style={{ background: category.color }}
                >
                  {category.label}
                </span>
                {challenge.seconds && (
                  <span className="flex items-center gap-1.5 rounded-full bg-raised px-3 py-1 text-muted">
                    <ClockIcon width={15} height={15} />
                    {formatDuration(challenge.seconds)}
                  </span>
                )}
              </div>
              <h2 className="font-display text-[38px] leading-[1.08] font-semibold tracking-tight text-balance">
                {challenge.title}
              </h2>
              <p className="text-lg leading-relaxed text-muted">{challenge.description}</p>
            </div>
            </div>

            <div className="fade-in flex flex-col gap-2.5">
              {challenge.seconds ? (
                <>
                  <Button onClick={startTimer}>Timer starten</Button>
                  <Button variant="soft" onClick={complete}>
                    Ohne Timer erledigt
                  </Button>
                </>
              ) : (
                <Button onClick={complete}>Erledigt</Button>
              )}
              <div className="flex">
                <Button variant="ghost" onClick={() => another({ skipped: true })}>
                  Andere Challenge
                </Button>
                {challenge.category === 'bewegung' && (
                  <Button variant="ghost" onClick={() => another({ skipped: true, withoutMovement: true })}>
                    Ohne Bewegung
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {phase === 'run' && (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="rise-in flex flex-1 flex-col justify-center gap-8 py-6">
              <TimerRing
                progress={total > 0 ? remaining / total : 0}
                secondsLeft={Math.ceil(remaining / 1000)}
                color={category.color}
              />
              <div className="text-center">
                <h2 className="font-display text-2xl leading-tight font-semibold text-balance">{challenge.title}</h2>
                <p className="mt-2 text-muted">{challenge.description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <Button onClick={complete}>Fertig</Button>
              <Button variant="soft" onClick={togglePause}>
                {running ? 'Pause' : 'Weiter'}
              </Button>
            </div>
          </div>
        )}

        {phase === 'done' && done && (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="scroll-area flex min-h-0 flex-1 flex-col">
              <div className="my-auto flex shrink-0 flex-col items-center gap-5 py-2 text-center">
              <div className="pop-in grid size-20 shrink-0 place-items-center rounded-full bg-dawn text-night">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    className="check-path"
                    d="M5 12.5l4.5 4.5L19 7.5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="rise-in flex flex-col gap-2">
                <h2 className="font-display text-[32px] leading-tight font-semibold text-balance">{done.message}</h2>
                <p className="text-muted">
                  {state.log.length === 1 ? 'Das war dein erster Reset.' : `Das war dein ${state.log.length}. Reset.`}
                </p>
              </div>

              {fresh.length > 0 && (
                <div className="rise-in flex flex-col items-center gap-2">
                  {fresh.map((a) => (
                    <div key={a.id} className="rounded-2xl border border-dawn/40 bg-dawn/10 px-4 py-2.5">
                      <div className="text-[13px] text-dawn">Neu freigeschaltet</div>
                      <div className="font-medium">{a.title}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="rise-in w-full rounded-3xl bg-surface p-4">
                {effect === null ? (
                  <>
                    <p className="mb-3 text-[15px] text-muted">Ist der Drang schwächer geworden? (freiwillig)</p>
                    <div className="flex gap-2">
                      <Button variant="soft" className="px-3! text-[15px]!" onClick={() => answer('weaker')}>
                        Ja, schwächer
                      </Button>
                      <Button variant="soft" className="px-3! text-[15px]!" onClick={() => answer('same')}>
                        Etwa gleich
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="fade-in text-[15px] leading-relaxed">
                    {effect === 'weaker'
                      ? 'Schön. Genau dafür ist dieser Moment da.'
                      : 'Das ist in Ordnung. Manchmal braucht es eine zweite Runde oder einfach etwas Zeit.'}
                  </p>
                )}
              </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <Button onClick={onClose}>Schliessen</Button>
              <Button variant="ghost" onClick={() => another({ skipped: false })}>
                Noch eine Challenge
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

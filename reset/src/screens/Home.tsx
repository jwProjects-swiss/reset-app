import { useState } from 'react'
import { HOME_LINES, pick } from '../data/messages'
import { streaks, todayCount } from '../lib/stats'
import { useStore } from '../lib/store'

export function Home({ onReset }: { onReset: () => void }) {
  const { state } = useStore()
  const [line] = useState(() => pick(HOME_LINES))
  const today = todayCount(state.log)
  const { current } = streaks(state.log)

  return (
    <div className="gutter flex h-full flex-col items-center justify-center gap-14 pb-4">
      <div className="relative size-60">
        <span className="halo" />
        <span className="halo" />
        <button
          type="button"
          onClick={onReset}
          aria-label="Reset: zufällige Challenge anzeigen"
          className="disc relative grid size-full place-items-center rounded-full text-night"
        >
          <span className="font-display text-[44px] font-bold tracking-[0.06em]">RESET</span>
        </button>
      </div>

      <div className="flex min-h-16 flex-col items-center gap-2 text-center">
        <p className="text-lg text-ink/90">
          {today === 0 ? line : today === 1 ? 'Heute einmal innegehalten' : `Heute ${today} Mal innegehalten`}
        </p>
        {state.settings.streak && current >= 2 && (
          <p className="text-sm text-muted">Seit {current} Tagen dabei</p>
        )}
      </div>
    </div>
  )
}

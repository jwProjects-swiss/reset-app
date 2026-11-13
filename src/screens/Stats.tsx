import { ACHIEVEMENTS } from '../data/achievements'
import { CATEGORIES } from '../data/categories'
import { Group, Row, ScreenTitle } from '../components/ui'
import { activeDays, lastDays, streaks } from '../lib/stats'
import { useStore } from '../lib/store'

const days = (n: number) => (n === 1 ? '1 Tag' : `${n} Tage`)

export function Stats() {
  const { state } = useStore()
  const { log } = state
  const total = log.length
  const weaker = log.filter((e) => e.effect === 'weaker').length
  const answered = log.filter((e) => e.effect !== null).length
  const { current, longest } = streaks(log)
  const week = lastDays(log, 7)
  const weekMax = Math.max(1, ...week.map((d) => d.count))
  const perCategory = CATEGORIES.map((c) => ({ ...c, count: log.filter((e) => e.category === c.id).length }))
  const categoryMax = Math.max(1, ...perCategory.map((c) => c.count))
  const unlockedCount = ACHIEVEMENTS.filter((a) => state.unlocked[a.id]).length

  return (
    <div className="scroll-area gutter flex h-full flex-col gap-7 pt-8 pb-8">
      <ScreenTitle>Verlauf</ScreenTitle>

      <p className="font-display text-2xl leading-snug font-medium text-balance text-moon">
        {total === 0
          ? 'Noch kein Reset. Der erste wartet auf der Startseite.'
          : total === 1
            ? 'Du hast einmal innegehalten, statt dem Impuls zu folgen.'
            : `Du hast ${total} Mal innegehalten, statt dem Impuls zu folgen.`}
      </p>

      <Group>
        <Row title="Abgeschlossene Challenges" trailing={<Value>{total}</Value>} />
        <Row
          title="Drang danach schwächer"
          detail={answered > 0 ? `bei ${weaker} von ${answered} Rückmeldungen` : 'Noch keine Rückmeldung'}
          trailing={<Value>{weaker}</Value>}
        />
        <Row title="Tage mit Reset" trailing={<Value>{activeDays(log).length}</Value>} />
      </Group>

      {state.settings.streak && (
        <Group title="Serie" note="Ein einzelner Tag Pause unterbricht deine Serie nicht. Und deine längste Serie bleibt dir immer erhalten.">
          <Row title="Aktuell" trailing={<Value>{days(current)}</Value>} />
          <Row title="Längste" trailing={<Value>{days(longest)}</Value>} />
        </Group>
      )}

      <section className="flex flex-col gap-2">
        <h2 className="px-1 text-sm font-medium text-muted">Letzte 7 Tage</h2>
        <div className="flex h-40 items-end gap-2 rounded-3xl bg-surface px-4 pt-5 pb-3">
          {week.map((d) => (
            <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className="text-xs text-muted tabular-nums">{d.count > 0 ? d.count : ''}</span>
              <div
                className={`w-full max-w-7 rounded-full ${d.count > 0 ? 'bg-moon' : 'bg-raised'}`}
                style={{ height: d.count > 0 ? `${Math.max(12, (d.count / weekMax) * 100)}%` : '6px' }}
              />
              <span className="text-xs text-muted">{d.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="px-1 text-sm font-medium text-muted">Kategorien</h2>
        <div className="flex flex-col gap-3.5 rounded-3xl bg-surface p-4">
          {perCategory.map((c) => (
            <div key={c.id} className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[15px]">
                <span>{c.label}</span>
                <span className="text-muted tabular-nums">{c.count}</span>
              </div>
              <div className="h-1.5 rounded-full bg-raised">
                <div
                  className="h-full rounded-full transition-[width] duration-500 ease-soft"
                  style={{ width: `${(c.count / categoryMax) * 100}%`, background: c.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Group title={`Achievements (${unlockedCount} von ${ACHIEVEMENTS.length})`}>
        {ACHIEVEMENTS.map((a) => {
          const at = state.unlocked[a.id]
          return (
            <div key={a.id} className={`flex items-center gap-3 px-4 py-3.5 ${at ? '' : 'opacity-45'}`}>
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-full ${
                  at ? 'bg-dawn text-night' : 'border border-line text-muted'
                }`}
              >
                {at ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </span>
              <div className="min-w-0 flex-1">
                <div className="leading-snug">{a.title}</div>
                <div className="text-[13px] leading-snug text-muted">{a.description}</div>
              </div>
              {at && (
                <span className="text-xs text-muted">
                  {new Date(at).toLocaleDateString('de-CH', { day: 'numeric', month: 'short' })}
                </span>
              )}
            </div>
          )
        })}
      </Group>
    </div>
  )
}

function Value({ children }: { children: React.ReactNode }) {
  return <span className="font-display text-xl font-medium tabular-nums">{children}</span>
}

import { BackIcon, TrashIcon } from '../components/Icons'
import { Group, Row, ScreenTitle, Toggle } from '../components/ui'
import { CATEGORIES } from '../data/categories'
import { allChallenges, formatDuration, resolve } from '../lib/picker'
import { useStore } from '../lib/store'

export function ManageChallenges({ onBack, onCreate }: { onBack: () => void; onCreate: () => void }) {
  const { state, dispatch } = useStore()
  const all = allChallenges(state)

  return (
    <div className="scroll-area gutter flex h-full flex-col gap-7 pt-4 pb-8">
      <div className="flex flex-col gap-3">
        <BackButton onClick={onBack} />
        <ScreenTitle>Challenges</ScreenTitle>
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="rounded-full border border-line py-3 font-medium text-moon transition-colors hover:bg-surface"
      >
        Eigene Challenge erstellen
      </button>

      {CATEGORIES.map((category) => {
        const items = all.filter((c) => c.category === category.id)
        if (items.length === 0) return null
        return (
          <Group key={category.id} title={category.label}>
            {items.map((c) => {
              const shown = resolve(c, state.settings.intensity)
              const details = [c.custom ? 'Eigene' : '', shown.seconds ? formatDuration(shown.seconds) : '']
                .filter(Boolean)
                .join(', ')
              return (
                <Row
                  key={c.id}
                  dot={category.color}
                  title={shown.title}
                  detail={details || undefined}
                  trailing={
                    <div className="flex items-center gap-2">
                      {c.custom && (
                        <button
                          type="button"
                          aria-label={`${shown.title} löschen`}
                          onClick={() => dispatch({ type: 'removeCustom', id: c.id })}
                          className="grid size-9 place-items-center rounded-full text-muted hover:text-[#ff9b93]"
                        >
                          <TrashIcon width={19} height={19} />
                        </button>
                      )}
                      <Toggle
                        label={shown.title}
                        checked={!state.settings.disabled.includes(c.id)}
                        onChange={() => dispatch({ type: 'toggleChallenge', id: c.id })}
                      />
                    </div>
                  }
                />
              )
            })}
          </Group>
        )
      })}
    </div>
  )
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="-ml-2 flex items-center gap-0.5 self-start rounded-full py-2 pr-3 pl-1 text-moon"
    >
      <BackIcon width={20} height={20} />
      Einstellungen
    </button>
  )
}

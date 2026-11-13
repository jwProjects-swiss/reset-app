import type { ReactNode } from 'react'
import { ChartIcon, ResetIcon, SlidersIcon } from './Icons'

export type Tab = 'home' | 'stats' | 'settings'

const TABS: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: 'home', label: 'Reset', icon: <ResetIcon /> },
  { id: 'stats', label: 'Verlauf', icon: <ChartIcon /> },
  { id: 'settings', label: 'Einstellungen', icon: <SlidersIcon /> },
]

export function TabBar({ tab, onChange }: { tab: Tab; onChange: (tab: Tab) => void }) {
  return (
    <nav className="gutter flex border-t border-line/60 pt-2 pb-2" aria-label="Hauptnavigation">
      {TABS.map((t) => {
        const active = t.id === tab
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            aria-current={active ? 'page' : undefined}
            className={`flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 text-[11px] font-medium transition-colors duration-200 ${
              active ? 'text-moon' : 'text-muted hover:text-ink'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        )
      })}
    </nav>
  )
}

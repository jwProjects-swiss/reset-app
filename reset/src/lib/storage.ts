import { CATEGORIES } from '../data/categories'
import type { AppState, CategoryId, Settings } from '../types'

const KEY = 'reset.state.v1'

export function defaultSettings(): Settings {
  return {
    categories: Object.fromEntries(CATEGORIES.map((c) => [c.id, true])) as Record<CategoryId, boolean>,
    intensity: 'mittel',
    strength: true,
    disabled: [],
    streak: true,
    vibration: true,
    sound: true,
  }
}

export function defaultState(): AppState {
  return { version: 1, settings: defaultSettings(), custom: [], log: [], skips: 0, unlocked: {} }
}

/** Füllt fehlende Felder mit Standardwerten auf. So bleiben alte Speicherstände nach Updates lesbar. */
export function normalize(raw: unknown): AppState | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Partial<AppState>
  if (r.version !== 1) return null
  const base = defaultState()
  return {
    version: 1,
    settings: {
      ...base.settings,
      ...r.settings,
      categories: { ...base.settings.categories, ...r.settings?.categories },
      disabled: Array.isArray(r.settings?.disabled) ? r.settings.disabled : [],
    },
    custom: Array.isArray(r.custom) ? r.custom : [],
    log: Array.isArray(r.log) ? r.log : [],
    skips: typeof r.skips === 'number' ? r.skips : 0,
    unlocked: r.unlocked && typeof r.unlocked === 'object' ? r.unlocked : {},
  }
}

export function loadState(): AppState {
  try {
    const text = localStorage.getItem(KEY)
    if (text) return normalize(JSON.parse(text)) ?? defaultState()
  } catch {
    // Speicher nicht verfügbar (z. B. privater Modus): Die App läuft trotzdem, nur ohne Verlauf.
  }
  return defaultState()
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // siehe oben
  }
}

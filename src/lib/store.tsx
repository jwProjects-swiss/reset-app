import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react'
import { ACHIEVEMENTS } from '../data/achievements'
import type { AppState, Challenge, Effect, LogEntry, Settings } from '../types'
import { defaultState, loadState, saveState } from './storage'

export type Action =
  | { type: 'complete'; entry: LogEntry }
  | { type: 'effect'; entryId: string; effect: Effect }
  | { type: 'skip' }
  | { type: 'settings'; patch: Partial<Settings> }
  | { type: 'toggleChallenge'; id: string }
  | { type: 'addCustom'; challenge: Challenge }
  | { type: 'removeCustom'; id: string }
  | { type: 'import'; state: AppState }
  | { type: 'clear' }

function apply(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'complete':
      return { ...state, log: [...state.log, action.entry] }
    case 'effect':
      return {
        ...state,
        log: state.log.map((e) => (e.id === action.entryId ? { ...e, effect: action.effect } : e)),
      }
    case 'skip':
      return { ...state, skips: state.skips + 1 }
    case 'settings':
      return { ...state, settings: { ...state.settings, ...action.patch } }
    case 'toggleChallenge': {
      const disabled = state.settings.disabled.includes(action.id)
        ? state.settings.disabled.filter((id) => id !== action.id)
        : [...state.settings.disabled, action.id]
      return { ...state, settings: { ...state.settings, disabled } }
    }
    case 'addCustom':
      return { ...state, custom: [...state.custom, action.challenge] }
    case 'removeCustom':
      return {
        ...state,
        custom: state.custom.filter((c) => c.id !== action.id),
        settings: { ...state.settings, disabled: state.settings.disabled.filter((id) => id !== action.id) },
      }
    case 'import':
      return action.state
    case 'clear':
      return defaultState()
  }
}

/** Schaltet neu erreichte Achievements frei. Einmal erreichte bleiben für immer erhalten. */
function withAchievements(state: AppState): AppState {
  const fresh = ACHIEVEMENTS.filter((a) => !state.unlocked[a.id] && a.test(state))
  if (fresh.length === 0) return state
  const now = Date.now()
  return { ...state, unlocked: { ...state.unlocked, ...Object.fromEntries(fresh.map((a) => [a.id, now])) } }
}

function reducer(state: AppState, action: Action): AppState {
  return withAchievements(apply(state, action))
}

const StoreContext = createContext<{ state: AppState; dispatch: Dispatch<Action> } | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore muss innerhalb von StoreProvider verwendet werden')
  return ctx
}

export function newId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

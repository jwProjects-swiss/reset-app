import { CHALLENGES, FALLBACK_CHALLENGE } from '../data/challenges'
import type { ActiveChallenge, AppState, CategoryId, Challenge, Intensity } from '../types'

const LEVEL: Record<Intensity, 0 | 1 | 2> = { leicht: 0, mittel: 1, stark: 2 }

/** Setzt Intensität ein und macht aus einer gespeicherten Challenge eine anzeigbare. */
export function resolve(challenge: Challenge, intensity: Intensity): ActiveChallenge {
  const amount = challenge.amounts?.[LEVEL[intensity]]
  return {
    id: challenge.id,
    category: challenge.category,
    title: amount === undefined ? challenge.title : challenge.title.replace('{n}', String(amount)),
    description: challenge.description,
    seconds: challenge.amountIsSeconds ? amount : challenge.seconds,
  }
}

export function allChallenges(state: AppState): Challenge[] {
  return [...CHALLENGES, ...state.custom]
}

/** Alle Challenges, die mit den aktuellen Einstellungen in Frage kommen. */
export function pool(state: AppState, without?: CategoryId): Challenge[] {
  const { categories, disabled, strength } = state.settings
  return allChallenges(state).filter(
    (c) =>
      categories[c.category] &&
      c.category !== without &&
      !disabled.includes(c.id) &&
      (strength || !c.strenuous),
  )
}

// Die zuletzt gezeigten Challenges, damit sich nichts direkt wiederholt.
const recent: string[] = []

export function pickChallenge(state: AppState, without?: CategoryId): ActiveChallenge {
  let candidates = pool(state, without)
  if (candidates.length === 0) candidates = pool(state)
  if (candidates.length === 0) return resolve(FALLBACK_CHALLENGE, state.settings.intensity)

  const keep = Math.min(8, candidates.length - 1)
  const blocked = recent.slice(-keep)
  const fresh = candidates.filter((c) => !blocked.includes(c.id))
  const list = fresh.length > 0 ? fresh : candidates

  const choice = list[Math.floor(Math.random() * list.length)]
  recent.push(choice.id)
  if (recent.length > 20) recent.shift()
  return resolve(choice, state.settings.intensity)
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds} Sek.`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s === 0 ? `${m} Min.` : `${m} Min. ${s} Sek.`
}

export function formatClock(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

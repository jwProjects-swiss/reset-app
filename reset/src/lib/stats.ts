import type { LogEntry } from '../types'

const DAY = 24 * 60 * 60 * 1000

/** Lokaler Tag als fortlaufende Zahl (Tage seit 1970 in Ortszeit). */
export function dayIndex(timestamp: number): number {
  const d = new Date(timestamp)
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY)
}

/** Sortierte Liste aller Tage, an denen mindestens eine Challenge abgeschlossen wurde. */
export function activeDays(log: LogEntry[]): number[] {
  return [...new Set(log.map((e) => dayIndex(e.at)))].sort((a, b) => a - b)
}

/**
 * Serie mit Nachsicht: Ein einzelner Tag Pause unterbricht die Serie nicht.
 * Gezählt werden die aktiven Tage innerhalb der Kette.
 */
export function streaks(log: LogEntry[], now = Date.now()): { current: number; longest: number } {
  const daysList = activeDays(log)
  if (daysList.length === 0) return { current: 0, longest: 0 }

  let longest = 1
  let run = 1
  for (let i = 1; i < daysList.length; i++) {
    run = daysList[i] - daysList[i - 1] <= 2 ? run + 1 : 1
    longest = Math.max(longest, run)
  }

  const today = dayIndex(now)
  const last = daysList[daysList.length - 1]
  const current = today - last <= 2 ? run : 0
  return { current, longest }
}

/** Anzahl Challenges pro Tag für die letzten n Tage, ältester Tag zuerst. */
export function lastDays(log: LogEntry[], n: number, now = Date.now()) {
  const today = dayIndex(now)
  const counts = new Map<number, number>()
  for (const e of log) {
    const d = dayIndex(e.at)
    counts.set(d, (counts.get(d) ?? 0) + 1)
  }
  return Array.from({ length: n }, (_, i) => {
    const day = today - (n - 1 - i)
    const date = new Date(now - (n - 1 - i) * DAY)
    return {
      day,
      label: date.toLocaleDateString('de-CH', { weekday: 'short' }).replace('.', ''),
      count: counts.get(day) ?? 0,
    }
  })
}

export function todayCount(log: LogEntry[], now = Date.now()): number {
  const today = dayIndex(now)
  return log.filter((e) => dayIndex(e.at) === today).length
}

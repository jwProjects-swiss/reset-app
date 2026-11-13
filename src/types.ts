export type CategoryId =
  | 'bewegung'
  | 'achtsamkeit'
  | 'konzentration'
  | 'kreativitaet'
  | 'produktivitaet'
  | 'entspannung'

export type Intensity = 'leicht' | 'mittel' | 'stark'

/** Wie eine Challenge gespeichert bzw. definiert ist. */
export interface Challenge {
  id: string
  category: CategoryId
  /** Darf den Platzhalter {n} enthalten, der je nach Intensität ersetzt wird. */
  title: string
  description: string
  /** Feste Timer-Dauer in Sekunden. Ohne Angabe gibt es keinen Timer. */
  seconds?: number
  /** Werte für {n} bei leicht, mittel, stark. */
  amounts?: [number, number, number]
  /** Wenn true, ist {n} gleichzeitig die Timer-Dauer in Sekunden. */
  amountIsSeconds?: boolean
  /** Kraftübung. Lässt sich in den Einstellungen komplett ausblenden. */
  strenuous?: boolean
  custom?: boolean
}

/** Eine Challenge, fertig aufbereitet für die Anzeige. */
export interface ActiveChallenge {
  id: string
  category: CategoryId
  title: string
  description: string
  seconds?: number
}

export type Effect = 'weaker' | 'same'

export interface LogEntry {
  id: string
  challengeId: string
  category: CategoryId
  at: number
  effect: Effect | null
}

export interface Settings {
  categories: Record<CategoryId, boolean>
  intensity: Intensity
  /** Kraftübungen anzeigen */
  strength: boolean
  /** IDs deaktivierter Challenges */
  disabled: string[]
  /** Serie anzeigen (freiwillig) */
  streak: boolean
  vibration: boolean
  sound: boolean
}

export interface AppState {
  version: 1
  settings: Settings
  custom: Challenge[]
  log: LogEntry[]
  skips: number
  /** Achievement-ID -> Zeitpunkt der Freischaltung */
  unlocked: Record<string, number>
}

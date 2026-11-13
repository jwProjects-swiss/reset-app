/** Rückmeldungen nach einer abgeschlossenen Challenge. */
export const DONE_MESSAGES = [
  'Gut gemacht.',
  'Das war ein Moment für dich.',
  'Du hast innegehalten. Das zählt.',
  'Stark, dass du das gemacht hast.',
  'Einmal durchgeatmet, einmal neu angesetzt.',
  'Schön, dass du dir die Zeit genommen hast.',
  'Du hast dir gerade selbst geholfen.',
  'Ein kleiner Schritt, und du hast ihn gemacht.',
  'Genau so geht das.',
  'Du hast dich für etwas anderes entschieden.',
]

/** Zeile unter dem RESET-Knopf. */
export const HOME_LINES = [
  'Ein Drang ist da? Drück drauf.',
  'Ein Klick, eine kleine Aufgabe.',
  'Nimm dir einen Moment.',
  'Du musst dem Impuls nicht sofort folgen.',
]

export function pick<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)]
}

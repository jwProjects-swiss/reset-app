import { CATEGORIES } from './categories'
import { activeDays } from '../lib/stats'
import type { AppState } from '../types'

export interface Achievement {
  id: string
  title: string
  description: string
  test: (state: AppState) => boolean
}

const count = (n: number) => (s: AppState) => s.log.length >= n
const days = (n: number) => (s: AppState) => activeDays(s.log).length >= n

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first', title: 'Erster Schritt', description: 'Deine erste Challenge abgeschlossen', test: count(1) },
  { id: 'five', title: 'Fünf Mal innegehalten', description: '5 Challenges abgeschlossen', test: count(5) },
  { id: 'ten', title: 'Zweistellig', description: '10 Challenges abgeschlossen', test: count(10) },
  { id: 'twentyfive', title: 'Gut eingespielt', description: '25 Challenges abgeschlossen', test: count(25) },
  { id: 'fifty', title: 'Fünfzig', description: '50 Challenges abgeschlossen', test: count(50) },
  { id: 'hundred', title: 'Hundert', description: '100 Challenges abgeschlossen', test: count(100) },
  {
    id: 'allcats',
    title: 'Rundum',
    description: 'Aus jeder Kategorie eine Challenge gemacht',
    test: (s) => CATEGORIES.every((c) => s.log.some((e) => e.category === c.id)),
  },
  {
    id: 'weaker5',
    title: 'Wellenreiter',
    description: '5 Mal wurde der Drang danach schwächer',
    test: (s) => s.log.filter((e) => e.effect === 'weaker').length >= 5,
  },
  {
    id: 'double',
    title: 'Zweite Runde',
    description: 'Zwei Challenges direkt hintereinander',
    test: (s) => s.log.some((e, i) => i > 0 && e.at - s.log[i - 1].at < 10 * 60 * 1000),
  },
  {
    id: 'night',
    title: 'Nachtwache',
    description: 'Ein Reset zwischen 23 und 5 Uhr',
    test: (s) =>
      s.log.some((e) => {
        const h = new Date(e.at).getHours()
        return h >= 23 || h < 5
      }),
  },
  { id: 'days3', title: 'Drei Tage dabei', description: 'An 3 verschiedenen Tagen genutzt', test: days(3) },
  { id: 'days7', title: 'Eine Woche voll', description: 'An 7 verschiedenen Tagen genutzt', test: days(7) },
  { id: 'days30', title: 'Dreissig Tage', description: 'An 30 verschiedenen Tagen genutzt', test: days(30) },
  {
    id: 'own',
    title: 'Eigene Idee',
    description: 'Eine eigene Challenge erstellt',
    test: (s) => s.custom.length > 0,
  },
]

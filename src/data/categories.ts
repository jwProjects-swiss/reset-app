import type { CategoryId } from '../types'

export interface Category {
  id: CategoryId
  label: string
  hint: string
  color: string
}

export const CATEGORIES: Category[] = [
  { id: 'bewegung', label: 'Bewegung', hint: 'Den Körper kurz in Gang bringen', color: '#ffb59a' },
  { id: 'achtsamkeit', label: 'Achtsamkeit', hint: 'Wahrnehmen, was gerade da ist', color: '#a9c8ff' },
  { id: 'konzentration', label: 'Konzentration', hint: 'Dem Kopf eine Aufgabe geben', color: '#c9b5ff' },
  { id: 'kreativitaet', label: 'Kreativität', hint: 'Etwas Kleines erschaffen', color: '#ffd98a' },
  { id: 'produktivitaet', label: 'Produktivität', hint: 'Eine Kleinigkeit erledigen', color: '#9fe0c0' },
  { id: 'entspannung', label: 'Entspannung', hint: 'Spannung loslassen', color: '#f5b6d6' },
]

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<
  CategoryId,
  Category
>

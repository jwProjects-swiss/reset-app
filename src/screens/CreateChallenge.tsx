import { useState, type FormEvent } from 'react'
import { Button, ScreenTitle } from '../components/ui'
import { CATEGORIES } from '../data/categories'
import { newId, useStore } from '../lib/store'
import type { CategoryId } from '../types'
import { BackButton } from './ManageChallenges'

const TIMER_OPTIONS = [
  { seconds: 0, label: 'Kein Timer' },
  { seconds: 30, label: '30 Sek.' },
  { seconds: 60, label: '1 Min.' },
  { seconds: 120, label: '2 Min.' },
  { seconds: 180, label: '3 Min.' },
  { seconds: 300, label: '5 Min.' },
]

const chip = (active: boolean) =>
  `rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-200 ${
    active ? 'bg-moon text-night' : 'bg-surface text-muted hover:text-ink'
  }`

const field =
  'w-full rounded-2xl border border-line bg-surface px-4 py-3 text-[16px] text-ink placeholder:text-muted/60 focus:border-moon focus:outline-none'

export function CreateChallenge({ onBack, onSaved }: { onBack: () => void; onSaved: () => void }) {
  const { dispatch } = useStore()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<CategoryId>('achtsamkeit')
  const [seconds, setSeconds] = useState(0)

  function save(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    dispatch({
      type: 'addCustom',
      challenge: {
        id: `custom-${newId()}`,
        category,
        title: title.trim(),
        description: description.trim(),
        seconds: seconds || undefined,
        custom: true,
      },
    })
    onSaved()
  }

  return (
    <form onSubmit={save} className="scroll-area gutter flex h-full flex-col gap-6 pt-4 pb-8">
      <div className="flex flex-col gap-3">
        <BackButton onClick={onBack} />
        <ScreenTitle>Eigene Challenge</ScreenTitle>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-muted" htmlFor="custom-title">
        Was ist zu tun?
        <input
          id="custom-title"
          className={field}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="z. B. Giesse deine Pflanzen"
          maxLength={80}
          required
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-muted" htmlFor="custom-description">
        Kurze Beschreibung (freiwillig)
        <textarea
          id="custom-description"
          className={`${field} resize-none`}
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ein Satz, der dir das Anfangen leichter macht"
          maxLength={200}
        />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-medium text-muted">Kategorie</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c.id} type="button" aria-pressed={category === c.id} onClick={() => setCategory(c.id)} className={chip(category === c.id)}>
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-medium text-muted">Timer</legend>
        <div className="flex flex-wrap gap-2">
          {TIMER_OPTIONS.map((o) => (
            <button key={o.seconds} type="button" aria-pressed={seconds === o.seconds} onClick={() => setSeconds(o.seconds)} className={chip(seconds === o.seconds)}>
              {o.label}
            </button>
          ))}
        </div>
      </fieldset>

      <Button type="submit" disabled={!title.trim()} className="mt-2 shrink-0">
        Challenge speichern
      </Button>
    </form>
  )
}

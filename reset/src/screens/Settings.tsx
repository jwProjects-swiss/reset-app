import { useRef, useState } from 'react'
import { ChevronIcon } from '../components/Icons'
import { Group, Row, ScreenTitle, Segmented, Toggle } from '../components/ui'
import { CATEGORIES } from '../data/categories'
import { allChallenges, pool } from '../lib/picker'
import { normalize } from '../lib/storage'
import { useStore } from '../lib/store'
import type { Intensity } from '../types'
import { CreateChallenge } from './CreateChallenge'
import { ManageChallenges } from './ManageChallenges'

type View = 'main' | 'manage' | 'create'

export function Settings() {
  const { state, dispatch } = useStore()
  const { settings } = state
  const [view, setView] = useState<View>('main')
  const [confirmClear, setConfirmClear] = useState(false)
  const [notice, setNotice] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)

  if (view === 'manage') return <ManageChallenges onBack={() => setView('main')} onCreate={() => setView('create')} />
  if (view === 'create') return <CreateChallenge onBack={() => setView('main')} onSaved={() => setView('manage')} />

  const available = pool(state).length
  const totalCount = allChallenges(state).length

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reset-daten-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setNotice('Export gestartet. Die Datei liegt in deinen Downloads.')
  }

  async function importData(file: File | undefined) {
    if (!file) return
    try {
      const imported = normalize(JSON.parse(await file.text()))
      if (!imported) throw new Error('Format')
      dispatch({ type: 'import', state: imported })
      setNotice('Daten importiert.')
    } catch {
      setNotice('Diese Datei konnte nicht gelesen werden. Wähle eine Datei, die du aus RESET exportiert hast.')
    }
    if (fileInput.current) fileInput.current.value = ''
  }

  return (
    <div className="scroll-area gutter flex h-full flex-col gap-7 pt-8 pb-8">
      <ScreenTitle>Einstellungen</ScreenTitle>

      <Group
        title="Kategorien"
        note={
          available === 0
            ? 'Mit dieser Auswahl bleibt keine Challenge übrig. Du bekommst dann immer die Atemübung.'
            : `${available} von ${totalCount} Challenges sind gerade aktiv.`
        }
      >
        {CATEGORIES.map((c) => (
          <Row
            key={c.id}
            dot={c.color}
            title={c.label}
            detail={c.hint}
            trailing={
              <Toggle
                label={c.label}
                checked={settings.categories[c.id]}
                onChange={(on) =>
                  dispatch({ type: 'settings', patch: { categories: { ...settings.categories, [c.id]: on } } })
                }
              />
            }
          />
        ))}
      </Group>

      <Group title="Körperliche Übungen" note="Die Intensität bestimmt Wiederholungen und Dauer. Jede Übung lässt sich überspringen.">
        <div className="p-3">
          <Segmented<Intensity>
            label="Intensität"
            value={settings.intensity}
            onChange={(intensity) => dispatch({ type: 'settings', patch: { intensity } })}
            options={[
              { value: 'leicht', label: 'Leicht' },
              { value: 'mittel', label: 'Mittel' },
              { value: 'stark', label: 'Stark' },
            ]}
          />
        </div>
        <Row
          title="Kraftübungen"
          detail="Liegestütze, Kniebeugen und Ähnliches"
          trailing={
            <Toggle
              label="Kraftübungen"
              checked={settings.strength}
              onChange={(strength) => dispatch({ type: 'settings', patch: { strength } })}
            />
          }
        />
      </Group>

      <Group title="Challenges">
        <LinkRow title="Challenges verwalten" detail="Einzelne Challenges ein- und ausschalten" onClick={() => setView('manage')} />
        <LinkRow
          title="Eigene Challenge erstellen"
          detail={state.custom.length > 0 ? `${state.custom.length} eigene vorhanden` : undefined}
          onClick={() => setView('create')}
        />
      </Group>

      <Group title="Motivation">
        <Row
          title="Serie anzeigen"
          detail="Zählt die Tage, an denen du dabei warst"
          trailing={
            <Toggle
              label="Serie anzeigen"
              checked={settings.streak}
              onChange={(streak) => dispatch({ type: 'settings', patch: { streak } })}
            />
          }
        />
      </Group>

      <Group title="Timer-Ende">
        <Row
          title="Ton"
          trailing={
            <Toggle label="Ton" checked={settings.sound} onChange={(sound) => dispatch({ type: 'settings', patch: { sound } })} />
          }
        />
        <Row
          title="Vibration"
          detail="Auf iPhones im Browser nicht verfügbar"
          trailing={
            <Toggle
              label="Vibration"
              checked={settings.vibration}
              onChange={(vibration) => dispatch({ type: 'settings', patch: { vibration } })}
            />
          }
        />
      </Group>

      <Group
        title="Deine Daten"
        note={notice || 'Alles bleibt auf diesem Gerät. Es gibt kein Konto, keinen Server und kein Tracking.'}
      >
        <LinkRow title="Daten exportieren" detail="Als Datei sichern" onClick={exportData} />
        <LinkRow title="Daten importieren" detail="Ersetzt den aktuellen Stand" onClick={() => fileInput.current?.click()} />
        {confirmClear ? (
          <div className="flex flex-col gap-3 px-4 py-3.5">
            <p className="text-[15px]">Verlauf, eigene Challenges und Einstellungen wirklich löschen?</p>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-full bg-raised py-2.5 font-medium"
                onClick={() => setConfirmClear(false)}
              >
                Abbrechen
              </button>
              <button
                type="button"
                className="flex-1 rounded-full bg-[#ff9b93] py-2.5 font-semibold text-night"
                onClick={() => {
                  dispatch({ type: 'clear' })
                  setConfirmClear(false)
                  setNotice('Alle Daten gelöscht.')
                }}
              >
                Löschen
              </button>
            </div>
          </div>
        ) : (
          <button type="button" className="w-full px-4 py-3.5 text-left text-[#ff9b93]" onClick={() => setConfirmClear(true)}>
            Alle Daten löschen
          </button>
        )}
      </Group>
      <input
        ref={fileInput}
        id="import-file"
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => void importData(e.target.files?.[0])}
      />

      <p className="px-1 text-[13px] leading-relaxed text-muted">
        RESET ist ein Werkzeug zur Selbsthilfe und ersetzt keine Beratung oder Behandlung. Wenn dich etwas stark
        belastet, hol dir Unterstützung: in der Schweiz bei der Dargebotenen Hand (Telefon 143), in Deutschland bei
        der Telefonseelsorge (0800 111 0 111), in Österreich unter 142.
      </p>
    </div>
  )
}

function LinkRow({ title, detail, onClick }: { title: string; detail?: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="block w-full text-left transition-colors hover:bg-raised/50">
      <Row title={title} detail={detail} trailing={<ChevronIcon width={18} height={18} className="text-muted" />} />
    </button>
  )
}

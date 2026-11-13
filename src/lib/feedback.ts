/** Kleine Signale am Ende eines Timers. Alles ohne Dateien, direkt im Browser erzeugt. */

let audio: AudioContext | null = null

/** Muss aus einem Klick heraus aufgerufen werden, damit der Browser später Ton erlaubt. */
export function prepareSound(): void {
  try {
    audio ??= new AudioContext()
    if (audio.state === 'suspended') void audio.resume()
  } catch {
    audio = null
  }
}

export function chime(): void {
  if (!audio) return
  try {
    const now = audio.currentTime
    for (const [i, freq] of [523.25, 659.25, 783.99].entries()) {
      const osc = audio.createOscillator()
      const gain = audio.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      const start = now + i * 0.16
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.16, start + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 1.1)
      osc.connect(gain).connect(audio.destination)
      osc.start(start)
      osc.stop(start + 1.2)
    }
  } catch {
    // Ton ist nur ein Extra
  }
}

export function vibrate(pattern: number | number[]): void {
  try {
    navigator.vibrate?.(pattern)
  } catch {
    // nicht jedes Gerät kann vibrieren (iPhones z. B. nicht im Browser)
  }
}

/** Hält den Bildschirm wach, solange ein Timer läuft. Gibt eine Funktion zum Freigeben zurück. */
export async function keepAwake(): Promise<() => void> {
  try {
    const lock = await navigator.wakeLock?.request('screen')
    return () => void lock?.release().catch(() => {})
  } catch {
    return () => {}
  }
}

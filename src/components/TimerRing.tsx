import { formatClock } from '../lib/picker'

const R = 104
const C = 2 * Math.PI * R

/** Countdown als Ring. progress läuft von 1 (voll) bis 0 (abgelaufen). */
export function TimerRing({ progress, secondsLeft, color }: { progress: number; secondsLeft: number; color: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-60">
      <svg viewBox="0 0 240 240" className="size-full -rotate-90">
        <circle cx="120" cy="120" r={R} fill="none" stroke="var(--color-raised)" strokeWidth="10" />
        <circle
          cx="120"
          cy="120"
          r={R}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
          style={{ transition: 'stroke-dashoffset 0.3s linear' }}
        />
      </svg>
      <div
        className="absolute inset-0 grid place-items-center font-display text-6xl font-medium tabular-nums"
        role="timer"
        aria-live="off"
      >
        {formatClock(secondsLeft)}
      </div>
    </div>
  )
}

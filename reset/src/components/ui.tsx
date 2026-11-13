import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'soft' | 'ghost' }

const BUTTON_STYLES = {
  primary: 'bg-moon text-night font-semibold hover:bg-white',
  soft: 'bg-raised text-ink font-medium hover:bg-line',
  ghost: 'text-muted font-medium hover:text-ink',
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`min-h-13 w-full rounded-full px-6 text-[17px] transition duration-200 active:scale-[0.97] disabled:opacity-40 ${BUTTON_STYLES[variant]} ${className}`}
      {...props}
    />
  )
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-8 w-13 shrink-0 rounded-full transition-colors duration-200 ${
        checked ? 'bg-moon' : 'bg-line'
      }`}
    >
      <span
        className={`absolute top-1 left-1 size-6 rounded-full shadow transition-transform duration-200 ease-soft ${
          checked ? 'translate-x-5 bg-night' : 'bg-muted'
        }`}
      />
    </button>
  )
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
  label: string
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-full bg-bg p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          onClick={() => onChange(o.value)}
          className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors duration-200 ${
            o.value === value ? 'bg-moon text-night' : 'text-muted hover:text-ink'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

/** Abschnitt mit Überschrift und einer Gruppe von Zeilen, wie in den iOS-Einstellungen. */
export function Group({ title, note, children }: { title?: string; note?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      {title && <h2 className="px-1 text-sm font-medium text-muted">{title}</h2>}
      <div className="divide-y divide-line/60 overflow-hidden rounded-3xl bg-surface">{children}</div>
      {note && <p className="px-1 text-[13px] leading-snug text-muted">{note}</p>}
    </section>
  )
}

export function Row({
  title,
  detail,
  trailing,
  dot,
}: {
  title: string
  detail?: string
  trailing?: ReactNode
  dot?: string
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      {dot && <span className="size-2.5 shrink-0 rounded-full" style={{ background: dot }} />}
      <div className="min-w-0 flex-1">
        <div className="text-[16px] leading-snug">{title}</div>
        {detail && <div className="text-[13px] leading-snug text-muted">{detail}</div>}
      </div>
      {trailing}
    </div>
  )
}

export function ScreenTitle({ children }: { children: ReactNode }) {
  return <h1 className="font-display text-[34px] leading-tight font-semibold tracking-tight">{children}</h1>
}

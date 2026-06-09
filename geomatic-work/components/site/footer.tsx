export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[color:var(--color-line)] px-6 py-10 md:px-16">
      <div className="mono flex flex-col items-start justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ink-mute)] md:flex-row md:items-center">
        <span>© Maypels Engineering Services · Ho · Volta Region · MMXXVI</span>
        <span>
          <a
            href="mailto:leslie.azumah@gmail.com"
            className="transition-colors duration-300 hover:text-[color:var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-accent)]"
          >
            leslie.azumah@gmail.com
          </a>
          <span className="px-2 text-[color:var(--color-line-strong)]">·</span>
          <a
            href="tel:+233543860396"
            className="transition-colors duration-300 hover:text-[color:var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-accent)]"
          >
            +233 54 386 0396
          </a>
        </span>
        <span>Principal · Leslie Azumah · GhIS</span>
      </div>
    </footer>
  );
}

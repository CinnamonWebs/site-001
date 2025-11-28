// src/components/Hero.tsx
type HeroProps = {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export default function Hero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: HeroProps) {
  return (
    <section className="bg-sand">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-4 py-16 md:flex-row md:items-center md:py-24">
        <div className="flex-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cinnamon">
            desarrollo web para negocios reales
          </p>
          <h1 className="mb-4 text-3xl font-bold text-ink md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mb-6 max-w-xl text-base text-neutral-700 md:text-lg">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/contacto"
              className="rounded-full bg-cinnamon px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cinnamon-dark"
            >
              {ctaPrimary}
            </a>
            <a
              href="/portfolio"
              className="rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-ink transition hover:border-cinnamon hover:text-cinnamon"
            >
              {ctaSecondary}
            </a>
          </div>

          <p className="mt-4 text-xs text-neutral-500">
            Sin discurso confuso, ni sobre diseños costosos. Con explicaciones simples y directas.
          </p>
        </div>

        {/* El panel de ejemplo lo dejo igual que antes */}
        <div className="flex-1">
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/80 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              ejemplo de caso típico
            </p>
            <h2 className="mt-2 text-lg font-semibold text-ink">
              “Necesitamos algo mejor que nuestra página vieja…”
            </h2>
            <p className="mt-2 text-sm text-neutral-700">
              Rediseñamos el sitio de una PyME, para que los contactos
              desde la web crezcan progresivamente. Diseño claro, mensaje
              directo y carga rápida.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

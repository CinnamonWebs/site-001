import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-sand">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-4 py-16 md:flex-row md:items-center md:py-24">
        <div className="flex-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cinnamon">
            desarrollo web para negocios reales
          </p>
          <h1 className="mb-4 text-3xl font-bold text-ink md:text-4xl lg:text-5xl">
            Sitios web que le dan sabor a tu{" "}
            <span className="text-cinnamon">negocio</span>.
          </h1>
          <p className="mb-6 max-w-xl text-base text-neutral-700 md:text-lg">
            Creamos sitios rápidos, modernos y fáciles de usar para PyMEs,
            comercios y profesionales independientes. Tu web deja de ser un
            gasto y pasa a ser una herramienta de venta.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contacto"
              className="rounded-full bg-cinnamon px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cinnamon-dark"
            >
              Quiero mi sitio web
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-ink transition hover:border-cinnamon hover:text-cinnamon"
            >
              Ver trabajos
            </Link>
          </div>

          <p className="mt-4 text-xs text-neutral-500">
            Sin tecnicismos raros, sin humo. Explicamos todo en criollo.
          </p>
        </div>

        <div className="flex-1">
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/80 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              ejemplo de resultado
            </p>
            <h2 className="mt-2 text-lg font-semibold text-ink">
              “Necesitamos algo mejor que nuestra página vieja…”
            </h2>
            <p className="mt-2 text-sm text-neutral-700">
              Rediseñamos el sitio de una PyME y logramos que los contactos
              desde la web crezcan un 40% en tres meses. Diseño claro, mensaje
              directo y carga rápida.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

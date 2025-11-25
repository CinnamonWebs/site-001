import Layout from "@/components/Layout";

export default function AboutPage() {
  return (
    <Layout
      title="Nosotros"
      description="Conocé la filosofía de trabajo detrás de CinnamonWebs."
    >
      <section className="bg-sand">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h1 className="text-3xl font-semibold text-ink md:text-4xl">
            Detrás de CinnamonWebs
          </h1>
          <p className="mt-3 text-sm text-neutral-700 md:text-base">
            CinnamonWebs nace con una idea simple: <strong>hacer sitios web que
            sirvan para algo</strong>. Nada de diseños recargados sin sentido ni
            textos que nadie lee. Sitios claros, rápidos y que hablen el idioma
            de tus clientes.
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base">
            <p>
              Trabajo especialmente con PyMEs, pequeños comercios y
              profesionales independientes. Gente que está ocupada haciendo que
              su negocio funcione y no tiene tiempo para pelearse con la
              tecnología.
            </p>
            <p>
              El enfoque es siempre el mismo: entender tu negocio, tus clientes
              y tus objetivos, y recién ahí decidir qué tipo de sitio necesitás.
              A veces es una landing simple, otras un sitio más completo con
              contenido frecuente.
            </p>
            <p>
              Vas a hablar con una persona, no con un call center. Y te voy a
              explicar cada decisión en criollo, sin siglas raras ni discursos
              de humo.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import Layout from "@/components/Layout";

export default function ContactPage() {
  return (
    <Layout
      title="Contacto"
      description="Contactá a CinnamonWebs para hablar sobre tu próximo sitio web."
    >
      <section className="bg-sand">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-semibold text-ink md:text-4xl">
            Contáctame
          </h1>
          <p className="mt-3 text-sm text-neutral-700 md:text-base">
            Contame brevemente qué tipo de negocio tenés y qué esperás de tu
            sitio web. Te respondo con una propuesta clara, sin compromiso.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-[2fr,1fr]">
            <form
              className="space-y-4 rounded-2xl bg-white p-6 shadow-sm"
              action="https://formspree.io/f/mayuscula" // reemplazá esto por tu endpoint o dejá vacío por ahora
              method="POST"
            >
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Nombre y apellido
                </label>
                <input
                  type="text"
                  name="nombre"
                  required
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-cinnamon focus:ring-1 focus:ring-cinnamon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-cinnamon focus:ring-1 focus:ring-cinnamon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Tipo de negocio
                </label>
                <input
                  type="text"
                  name="negocio"
                  placeholder="Ej: estudio contable, local de ropa, consultora..."
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-cinnamon focus:ring-1 focus:ring-cinnamon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  ¿Qué necesitás?
                </label>
                <textarea
                  name="mensaje"
                  rows={5}
                  placeholder="Contame brevemente qué esperás de tu sitio web."
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-cinnamon focus:ring-1 focus:ring-cinnamon"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-cinnamon py-2.5 text-sm font-semibold text-white hover:bg-cinnamon-dark"
              >
                Enviar consulta
              </button>
            </form>

            <aside className="space-y-4 text-sm text-neutral-700">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                <h2 className="text-sm font-semibold text-ink">
                  Contacto directo
                </h2>
                <p className="mt-2">
                  Si preferís, podés mandar un mensaje directo por WhatsApp con
                  una breve descripción de tu proyecto.
                </p>
                <p className="mt-3 text-sm font-semibold text-cinnamon">
                  WhatsApp: +54 9 XX XXXX-XXXX
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";

const homeServices = [
  {
    title: "Landing page enfocada en conversión",
    priceFrom: "$",
    description:
      "Ideal para campañas, lanzamientos o servicios específicos. Una sola página bien pensada puede vender más que un sitio enorme.",
    features: [
      "Diseño a medida",
      "Texto orientado a conversión",
      "Integración con WhatsApp o formulario",
      "Optimización básica para SEO",
    ],
  },
  {
    title: "Sitio institucional para PyMEs",
    priceFrom: "$$",
    description:
      "Perfecto para empresas que necesitan una presencia profesional: quiénes somos, servicios, portfolio y contacto.",
    features: [
      "Hasta 5 secciones principales",
      "Blog para noticias o novedades",
      "Diseño adaptable a móviles",
      "Integración con redes sociales",
    ],
  },
  {
    title: "Sitio administrable con blog",
    priceFrom: "$$+",
    description:
      "Para negocios que quieren generar contenido y aparecer en Google con artículos útiles.",
    features: [
      "Panel simple para editar contenido",
      "Blog con categorización",
      "Buenas prácticas de SEO técnico",
      "Analítica básica integrada",
    ],
  },
];

export default function HomePage() {
  return (
    <Layout>
      <Hero />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold text-ink md:text-3xl">
            Lo que hacemos en CinnamonWebs
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-700 md:text-base">
            Diseñamos y desarrollamos sitios web claros, rápidos y alineados con
            tus objetivos de negocio. Nada de plantillas genéricas llenas de
            cosas que no necesitás.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {homeServices.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-neutral-600">
              ¿No sabés qué tipo de sitio necesitás? Te ayudamos a definirlo en
              una llamada corta y sin compromiso.
            </p>
            <Link
              href="/contacto"
              className="rounded-full bg-cinnamon px-5 py-2 text-sm font-semibold text-white hover:bg-cinnamon-dark"
            >
              Agenda una llamada
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

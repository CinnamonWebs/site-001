import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    title: "Landing page de alto impacto",
    priceFrom: "$",
    description:
      "Una página enfocada en un objetivo: que te contacten, se registren o compren.",
    features: [
      "Diseño responsive",
      "Copy orientado a resultados",
      "Integración con WhatsApp / email",
      "Instalación de Google Analytics",
    ],
  },
  {
    title: "Sitio institucional completo",
    priceFrom: "$$",
    description:
      "Presencia profesional para tu empresa, con toda la información que tus clientes necesitan.",
    features: [
      "Hasta 5 secciones (Inicio, Empresa, Servicios, Portfolio, Contacto)",
      "Blog simple",
      "Carga rápida y optimización básica de SEO",
      "Capacitación breve para que puedas editar textos",
    ],
  },
  {
    title: "Sitio administrable con CMS",
    priceFrom: "$$+",
    description:
      "Para negocios que quieren publicar contenido de forma frecuente y ordenada.",
    features: [
      "Integración con CMS headless (por ejemplo Sanity)",
      "Blog categorizado",
      "Buenas prácticas SEO técnica",
      "Soporte inicial post-lanzamiento",
    ],
  },
];

export default function ServicesPage() {
  return (
    <Layout title="Servicios" description="Servicios de desarrollo web CinnamonWebs.">
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold text-ink md:text-4xl">
            Servicios de desarrollo web
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-neutral-700 md:text-base">
            Cada negocio es distinto, pero todos necesitan lo mismo: claridad
            para comunicar y facilidad para que la gente te contacte. Estos son
            los paquetes base que podemos adaptar a tu realidad.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

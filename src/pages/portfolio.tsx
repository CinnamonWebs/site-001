import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    name: "Estudio Contable Río",
    client: "Profesionales",
    description:
      "Sitio institucional para un estudio contable que necesitaba comunicar servicios de forma clara y captar clientes por Google.",
    tags: ["Sitio institucional", "Blog", "SEO básico"],
    url: "#",
  },
  {
    name: "Tienda Natural AromaCanela",
    client: "Comercio minorista",
    description:
      "Landing page + catálogo simple para una tienda de productos naturales que vende por WhatsApp e Instagram.",
    tags: ["Landing", "Catálogo", "Integración WhatsApp"],
    url: "#",
  },
  {
    name: "Consultora NovaTalento",
    client: "PyME",
    description:
      "Rediseño completo del sitio anterior, con foco en autoridad, claridad y generación de contactos.",
    tags: ["Rediseño", "UX", "Optimización de velocidad"],
    url: "#",
  },
];

export default function PortfolioPage() {
  return (
    <Layout title="Portfolio" description="Algunos proyectos y casos de CinnamonWebs.">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold text-ink md:text-4xl">
            Algunos proyectos y casos
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-neutral-700 md:text-base">
            Aunque muchos proyectos son confidenciales, estos ejemplos reflejan
            el tipo de resultados que podés esperar en cuanto a claridad,
            velocidad y enfoque comercial.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { GetStaticProps } from "next";
import {
  getJSONData,
  getFooterContent,
  type FooterContent,
} from "@/lib/content";

type Project = {
  name: string;
  client: string;
  description: string;
  tags?: string[];
  url?: string;
};

type PortfolioPageProps = {
  projects: Project[];
  footerContent: FooterContent;
};

export default function PortfolioPage({
  projects,
  footerContent,
}: PortfolioPageProps) {
  return (
    <Layout
      title="Portfolio"
      description="Algunos proyectos y casos de CinnamonWeb."
      footerContent={footerContent}
    >
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold text-ink md:text-4xl">
            Algunos proyectos y casos
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-neutral-700 md:text-base">
            Aunque muchos proyectos son confidenciales, estos ejemplos ficticios, reflejan
            el tipo de resultados que podés esperar en cuanto a claridad,
            agilidad y enfoque comercial.
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

export const getStaticProps: GetStaticProps<PortfolioPageProps> = async () => {
  const projects = getJSONData<Project[]>("portfolio/proyectos.json");
  const footerContent = getFooterContent();

  return {
    props: {
      projects,
      footerContent,
    },
  };
};

import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import { GetStaticProps } from "next";
import {
  getMarkdownData,
  getFooterContent,
  type FooterContent,
} from "@/lib/content";

type ServicioItem = {
  nombre: string;
  precioDesde?: string;
  descripcion: string;
  features: string[];
};

type ServiciosContent = {
  tituloPrincipal: string;
  descripcionIntro: string;
  servicios: ServicioItem[];
};

type ServicesPageProps = {
  content: ServiciosContent;
  footerContent: FooterContent;
};

export default function ServicesPage({
  content,
  footerContent,
}: ServicesPageProps) {
  return (
    <Layout
      title={content.tituloPrincipal}
      description={content.descripcionIntro}
      footerContent={footerContent}
    >
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold text-ink md:text-4xl">
            {content.tituloPrincipal}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-neutral-700 md:text-base">
            {content.descripcionIntro}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {content.servicios.map((service) => (
              <ServiceCard
                key={service.nombre}
                title={service.nombre}
                priceFrom={service.precioDesde}
                description={service.descripcion}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<ServicesPageProps> = async () => {
  const { data } = getMarkdownData("servicios.md");
  const footerContent = getFooterContent();

  return {
    props: {
      content: data as ServiciosContent,
      footerContent,
    },
  };
};

// src/pages/servicios.tsx
import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import { GetStaticProps } from "next";
import {
  getMarkdownData,
  getFooterContent,
  getTarifasMap,
  type FooterContent,
} from "@/lib/content";

type ServicioContent = {
  id: string;
  nombre: string;
  descripcion: string;
  features: string[];
};

type ServiciosPageContent = {
  titulo?: string;
  title?: string;
  descripcion?: string;
  description?: string;
  servicios?: ServicioContent[];
};

type ServicioConPrecio = ServicioContent & {
  precioDesde: string | null;
};

type ServiciosPageProps = {
  content: ServiciosPageContent;
  servicios: ServicioConPrecio[];
  footerContent: FooterContent;
};

export default function ServiciosPage({
  content,
  servicios,
  footerContent,
}: ServiciosPageProps) {
  const pageTitle = content.titulo ?? content.title ?? "Servicios";
  const pageDescription = content.descripcion ?? content.description ?? "";

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
      footerContent={footerContent}
    >
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold text-ink md:text-4xl">
            {pageTitle}
          </h1>
          {pageDescription && (
            <p className="mt-3 max-w-2xl text-sm text-neutral-700 md:text-base">
              {pageDescription}
            </p>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {servicios.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.nombre}
                description={service.descripcion}
                priceFrom={service.precioDesde}
                features={service.features}
                showPrice={true} //  acá SÍ mostramos precios
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<ServiciosPageProps> = async () => {
  const { data } = getMarkdownData<ServiciosPageContent>("servicios.md");
  const footerContent = getFooterContent();
  const tarifasMap = getTarifasMap();

  const servicios: ServicioConPrecio[] = (data.servicios ?? []).map((svc) => ({
    ...svc,
    precioDesde: tarifasMap[svc.id] ?? null,
  }));

  return {
    props: {
      content: data,
      servicios,
      footerContent,
    },
  };
};

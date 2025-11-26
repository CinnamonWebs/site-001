import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import { GetStaticProps } from "next";
import {
  getMarkdownData,
  getFooterContent,
  type FooterContent,
  getTarifasMap,
} from "@/lib/content";

type ServicioItem = {
  id: string;
  nombre: string;
  descripcion: string;
  features: string[];
};

type ServiciosContent = {
  tituloPrincipal: string;
  descripcionIntro: string;
  servicios: ServicioItem[];
};

type ServicioConPrecio = ServicioItem & {
  precioDesde?: string;
};

type ServicesPageProps = {
  content: Omit<ServiciosContent, "servicios">;
  servicios: ServicioConPrecio[];
  footerContent: FooterContent;
};


export default function ServicesPage({
  content,
  servicios,
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
            {servicios.map((service) => (
              <ServiceCard
                key={service.id}
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
  const tarifasMap = getTarifasMap();

  const rawContent = data as ServiciosContent;

  const servicios: ServicioConPrecio[] = rawContent.servicios.map(
    (service) => ({
      ...service,
      precioDesde: tarifasMap[service.id],
    })
  );

  const { servicios: _omit, ...restContent } = rawContent;

  return {
    props: {
      content: restContent,
      servicios,
      footerContent,
    },
  };
};

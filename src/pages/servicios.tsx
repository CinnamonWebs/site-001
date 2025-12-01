// src/pages/servicios.tsx
import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import { GetStaticProps } from "next";
import {
  getMarkdownData,
  getFooterContent,
  getTarifasMap,
  type FooterContent,
  type ContentImage,
} from "@/lib/content";
import Image from "next/image";

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

  // NUEVO: imagen opcional definida en servicios.md
  imagen?: ContentImage;
  imagenes?: ContentImage[]; // por si preferís manejarlo como array y usar la primera
};

type ServicioConPrecio = ServicioContent & {
  precioDesde: string | null;
};

type ServiciosPageProps = {
  content: ServiciosPageContent;
  servicios: ServicioConPrecio[];
  footerContent: FooterContent;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function ServiciosPage({
  content,
  servicios,
  footerContent,
}: ServiciosPageProps) {
  const pageTitle = content.titulo ?? content.title ?? "Servicios";
  const pageDescription = content.descripcion ?? content.description ?? "";

  // Tomamos la imagen desde `imagen`, o sino la primera de `imagenes`
  const imagenSection: ContentImage | undefined =
    content.imagen ?? content.imagenes?.[0];

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

          {/* Tarjetas de servicios con precio (como antes) */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {servicios.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.nombre}
                description={service.descripcion}
                priceFrom={service.precioDesde}
                features={service.features}
                showPrice={true} // acá SÍ mostramos precios
              />
            ))}
          </div>

          {/* Imagen centrada debajo de las tarjetas, ajustable con % */}
          {imagenSection && imagenSection.src && (
            <div className="mt-14 flex justify-center">
              {/* Ajustá el porcentaje acá: w-[60%], w-[50%], w-[80%], etc. */}
              <div className="relative w-[40%] aspect-[16/9] overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
                <Image
                  src={`${basePath}${imagenSection.src}`}
                  alt={imagenSection.alt}
                  fill
                  sizes="80vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}
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

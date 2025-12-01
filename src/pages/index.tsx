// src/pages/index.tsx
import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import { GetStaticProps } from "next";
import {
  getMarkdownData,
  getFooterContent,
  type FooterContent,
  type ContentImage,
} from "@/lib/content";
import Image from "next/image";

type HomeServiceContent = {
  id: string;
  titulo: string;
  descripcion: string;
};

type HomeContentFrontmatter = {
  // Hero
  heroOverline?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;

  // Sección "Lo que hacemos"
  serviciosTitulo?: string;
  serviciosDescripcion?: string;
  serviciosHome?: HomeServiceContent[];
  servicios?: HomeServiceContent[];

  // Compatibilidad con lo que ya tenías
  titulo?: string;
  title?: string;
  descripcion?: string;
  description?: string;

  // Imágenes definidas en home.md
  imagenes?: ContentImage[];
};

type HomeProps = {
  content: HomeContentFrontmatter;
  homeServices: HomeServiceContent[];
  footerContent: FooterContent;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function HomePage({
  content,
  homeServices,
  footerContent,
}: HomeProps) {
  const heroTitle =
    content.heroTitle ??
    content.titulo ??
    content.title ??
    "CinnamonWeb Developments";

  const heroSubtitle =
    content.heroSubtitle ??
    content.descripcion ??
    content.description ??
    "";

  const heroOverline =
    content.heroOverline ?? "DESARROLLO WEB PARA NEGOCIOS REALES";

  const heroPrimaryCtaLabel =
    content.heroPrimaryCtaLabel ?? "Quiero mi sitio web";
  const heroPrimaryCtaHref =
    content.heroPrimaryCtaHref ?? "/contacto";

  const heroSecondaryCtaLabel =
    content.heroSecondaryCtaLabel ?? "Ver trabajos";
  const heroSecondaryCtaHref =
    content.heroSecondaryCtaHref ?? "/portfolio";

  const serviciosTitulo =
    content.serviciosTitulo ?? "Lo que hacemos en CinnamonWeb";

  const serviciosDescripcion =
    content.serviciosDescripcion ??
    "Diseñamos sitios claros, ágiles y alineados con tus objetivos de negocio.";

  // Usamos solo una imagen para el caso típico
  const heroImageCase = content.imagenes?.[0];

  return (
    <Layout
      title={heroTitle}
      description={heroSubtitle}
      footerContent={footerContent}
    >
      {/* HERO */}
      <section className="bg-[#f5efe6]">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:items-center">
          {/* Columna texto */}
          <div className="md:w-1/2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              {heroOverline}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-ink md:text-5xl">
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p className="mt-4 text-sm text-neutral-800 md:text-base">
                {heroSubtitle}
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={heroPrimaryCtaHref}
                className="rounded-full bg-amber-700 px-6 py-2 text-sm font-semibold text-white hover:bg-amber-800"
              >
                {heroPrimaryCtaLabel}
              </a>
              <a
                href={heroSecondaryCtaHref}
                className="rounded-full border border-neutral-300 bg-white px-6 py-2 text-sm font-semibold text-ink hover:border-neutral-400"
              >
                {heroSecondaryCtaLabel}
              </a>
            </div>

            <p className="mt-4 text-xs text-neutral-600">
              Sin discurso confuso ni sobre diseños costosos. Con explicaciones simples y directas.
            </p>
          </div>

          {/* Columna "caso típico" */}
          <div className="md:w-1/2">
            {heroImageCase && heroImageCase.src && (
              <div className="ml-auto max-w-md rounded-3xl border border-dashed border-neutral-400 p-5 text-xs text-neutral-700 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  ejemplo de caso típico
                </p>
                <h2 className="mt-2 text-lg font-semibold text-ink">
                  “Necesitamos algo mejor que nuestra página vieja…”
                </h2>

                <div className="mt-3 flex justify-center">
                  {/* Cambiá 70% por el porcentaje que quieras */}
                  <div className="relative w-[70%] aspect-[3/2] overflow-hidden rounded-2xl bg-white">
                    <Image
                      src={`${basePath}${heroImageCase.src}`}
                      alt={heroImageCase.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 80vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <p className="mt-3 text-sm text-neutral-700">
                  Rediseñamos el sitio de una PyME para que los contactos
                  desde la web crezcan progresivamente. Diseño claro,
                  mensaje directo y carga rápida.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECCIÓN SERVICIOS HOME (sin precios) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold text-ink md:text-3xl">
            {serviciosTitulo}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-neutral-700 md:text-base">
            {serviciosDescripcion}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {homeServices.map((s) => (
              <ServiceCard
                key={s.id}
                title={s.titulo}
                description={s.descripcion}
                showPrice={false}
              />
            ))}
          </div>

          <p className="mt-6 text-sm text-neutral-600">
            Más info en la sección{" "}
            <a
              href="/servicios"
              className="font-medium text-amber-800 underline-offset-2 hover:underline"
            >
              Servicios
            </a>
            .
          </p>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = getMarkdownData<HomeContentFrontmatter>("home.md");
  const footerContent = getFooterContent();

  const rawServices = data.serviciosHome ?? data.servicios ?? [];

  return {
    props: {
      content: data,
      homeServices: rawServices,
      footerContent,
    },
  };
};

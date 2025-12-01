// src/pages/nosotros.tsx
import Layout from "@/components/Layout";
import { GetStaticProps } from "next";
import {
  getMarkdownData,
  getFooterContent,
  type FooterContent,
  type ContentImage,
} from "@/lib/content";
import Image from "next/image";

type NosotrosContent = {
  titulo: string;
  intro: string;

  // NUEVO: soporte para una imagen única
  imagen?: ContentImage;

  // Alternativa: si usa array, tomamos la primera
  imagenes?: ContentImage[];
};

type AboutPageProps = {
  frontmatter: NosotrosContent;
  body: string;
  footerContent: FooterContent;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function AboutPage({
  frontmatter,
  body,
  footerContent,
}: AboutPageProps) {
  const paragraphs = body
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  // Tomamos la imagen de frontmatter
  const imagen: ContentImage | undefined =
    frontmatter.imagen ?? frontmatter.imagenes?.[0];

  return (
    <Layout
      title={frontmatter.titulo}
      description={frontmatter.intro}
      footerContent={footerContent}
    >
      <section className="bg-sand">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h1 className="text-3xl font-semibold text-ink md:text-4xl">
            {frontmatter.titulo}
          </h1>
          <p className="mt-3 text-sm text-neutral-700 md:text-base">
            {frontmatter.intro}
          </p>

          {/* Imagen centrada, ajustable por % */}
          {imagen?.src && (
            <div className="mt-10 flex justify-center">
              {/* Ajustá el porcentaje acá → w-[60%], w-[50%], w-[70%], etc. */}
              <div className="relative w-[60%] aspect-[16/9] overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
                <Image
                  src={`${basePath}${imagen.src}`}
                  alt={imagen.alt}
                  fill
                  sizes="80vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="mt-10 space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const { data, content } = getMarkdownData("nosotros.md");
  const footerContent = getFooterContent();

  return {
    props: {
      frontmatter: data as NosotrosContent,
      body: content,
      footerContent,
    },
  };
};

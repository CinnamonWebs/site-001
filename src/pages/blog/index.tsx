// src/pages/blog/index.tsx
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import { GetStaticProps } from "next";
import {
  getMarkdownData,
  getAllBlogPosts,
  getFooterContent,
  type FooterContent,
  type BlogPostMeta,
  type ContentImage,
  type ContentLink,
} from "@/lib/content";
import Image from "next/image";

type BlogIndexContent = {
  titulo: string;
  descripcion: string;
  imagenes?: ContentImage[];
  links?: ContentLink[];
};

type BlogIndexProps = {
  content: BlogIndexContent;
  posts: BlogPostMeta[];
  footerContent: FooterContent;
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function BlogIndexPage({
  content,
  posts,
  footerContent,
}: BlogIndexProps) {
  const heroImage = content.imagenes?.[0]; // máx. 2, pero usamos la primera como hero
  const secondaryImage = content.imagenes?.[1];

  const ctaLink = content.links?.find((l) => l.id === "cta_blog");

  return (
    <Layout
      title={content.titulo}
      description={content.descripcion}
      footerContent={footerContent}
    >
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:items-center">
            <div>
              <h1 className="text-3xl font-semibold text-ink md:text-4xl">
                {content.titulo}
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-neutral-700 md:text-base">
                {content.descripcion}
              </p>

              {ctaLink && (
                <div className="mt-5">
                  <a
                    href={ctaLink.href}
                    className="inline-flex items-center rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-800"
                  >
                    {ctaLink.label ?? "Ver más"}
                  </a>
                </div>
              )}
            </div>

            {/* Imágenes del índice del blog, definidas en blog/index.md */}
            {(heroImage || secondaryImage) && (
              <div className="grid gap-3 sm:grid-cols-2">
                {heroImage && heroImage.src && (
                  <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-neutral-200">
                    <Image
                      src={`${basePath}${heroImage.src}`}
                      alt={heroImage.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}

                {secondaryImage && secondaryImage.src && (
                  <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-neutral-200 sm:mt-6">
                    <Image
                      src={`${basePath}${secondaryImage.src}`}
                      alt={secondaryImage.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={formatDate(post.date)}
                coverImage={post.coverImage}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const { data } = getMarkdownData<BlogIndexContent>("blog/index.md");
  const posts = getAllBlogPosts();
  const footerContent = getFooterContent();

  return {
    props: {
      content: data as BlogIndexContent,
      posts,
      footerContent,
    },
  };
};

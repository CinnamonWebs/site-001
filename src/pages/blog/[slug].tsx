// src/pages/blog/[slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getFooterContent,
  type BlogPost,
  type FooterContent,
  type ContentImage,
  type ContentLink,
} from "@/lib/content";
import Image from "next/image";

type BlogPostPageProps = {
  post: BlogPost & {
    imagenes?: ContentImage[];
    links?: ContentLink[];
  };
  footerContent: FooterContent;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostPage({ post, footerContent }: BlogPostPageProps) {
  // Imagen de portada tomada del frontmatter (ya normalizada en getBlogPostBySlug)
  const coverImage = post.coverImage;

  // Links definidos en el frontmatter del post (.md)
  const ctaLink = post.links?.find((l) => l.id === "cta_contacto");

  return (
    <Layout
      title={post.title}
      description={post.excerpt}
      footerContent={footerContent}
    >
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <header className="mb-8">
            <p className="text-xs uppercase tracking-wide text-neutral-500">
              {formatDate(post.date)}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-ink md:text-4xl">
              {post.title}
            </h1>

            {coverImage && coverImage.src && (
              <div className="relative mt-6 h-56 w-full overflow-hidden rounded-2xl border border-neutral-200">
                <Image
                  src={`${basePath}${coverImage.src}`}
                  alt={coverImage.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            )}
          </header>

          <article className="prose prose-neutral mt-6 max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>

          {ctaLink && (
            <div className="mt-10 rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4">
              <p className="text-sm font-medium text-amber-900">
                ¿Te gustaría aplicar esto en tu negocio?
              </p>
              <a
                href={ctaLink.href}
                className="mt-2 inline-flex text-sm font-semibold text-amber-800 hover:text-amber-900"
              >
                {ctaLink.label ?? "Hablemos de tu sitio web →"}
              </a>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllBlogPosts();

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const post = getBlogPostBySlug(slug);
  const footerContent = getFooterContent();

  // Nota: las imágenes y links ya vienen preparados desde getBlogPostBySlug
  return {
    props: {
      post: post as BlogPostPageProps["post"],
      footerContent,
    },
  };
};

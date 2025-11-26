import Layout from "@/components/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getFooterContent,
  type FooterContent,
} from "@/lib/content";

type BlogPostPageProps = {
  title: string;
  date: string;
  body: string;
  footerContent: FooterContent;
};

export default function BlogPostPage({
  title,
  date,
  body,
  footerContent,
}: BlogPostPageProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  const paragraphs = body
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <Layout title={title} footerContent={footerContent}>
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          {formattedDate && (
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
              {formattedDate}
            </p>
          )}
          <h1 className="mt-2 text-3xl font-semibold text-ink md:text-4xl">
            {title}
          </h1>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-800 md:text-base">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllBlogPosts();
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const post = getBlogPostBySlug(slug);
  const footerContent = getFooterContent();

  return {
    props: {
      title: post.title,
      date: post.date,
      body: post.content,
      footerContent,
    },
  };
};

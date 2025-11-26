import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import { GetStaticProps } from "next";
import {
  getMarkdownData,
  getAllBlogPosts,
  getFooterContent,
  type FooterContent,
  type BlogPostMeta,
} from "@/lib/content";

type BlogIndexContent = {
  titulo: string;
  descripcion: string;
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

export default function BlogIndexPage({
  content,
  posts,
  footerContent,
}: BlogIndexProps) {
  return (
    <Layout
      title={content.titulo}
      description={content.descripcion}
      footerContent={footerContent}
    >
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold text-ink md:text-4xl">
            {content.titulo}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-neutral-700 md:text-base">
            {content.descripcion}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={formatDate(post.date)}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const { data } = getMarkdownData("blog/index.md");
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

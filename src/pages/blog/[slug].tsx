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
} from "@/lib/content";

type BlogPostPageProps = {
  post: BlogPost;
  footerContent: FooterContent;
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostPage({ post, footerContent }: BlogPostPageProps) {
  return (
    <Layout
      title={post.title}
      description={post.excerpt}
      footerContent={footerContent}
    >
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            {formatDate(post.date)}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink md:text-4xl">
            {post.title}
          </h1>

          <article className="prose prose-neutral mt-6 max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>
        </div>
      </main>
    </Layout>
  );
}

// Genera las rutas estáticas a partir de los .md
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

  return {
    props: {
      post,
      footerContent,
    },
  };
};

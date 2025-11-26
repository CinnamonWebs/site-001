import Layout from "@/components/Layout";
import { GetStaticProps } from "next";
import {
  getMarkdownData,
  getFooterContent,
  type FooterContent,
} from "@/lib/content";

type NosotrosContent = {
  titulo: string;
  intro: string;
};

type AboutPageProps = {
  frontmatter: NosotrosContent;
  body: string;
  footerContent: FooterContent;
};

export default function AboutPage({
  frontmatter,
  body,
  footerContent,
}: AboutPageProps) {
  const paragraphs = body
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

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

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base">
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

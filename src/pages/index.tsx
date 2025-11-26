import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { GetStaticProps } from "next";
import {
  getMarkdownData,
  getFooterContent,
  type FooterContent,
  getTarifasMap,
} from "@/lib/content";

type HomeServiceContent = {
  id: string;
  title: string;
  description: string;
  features: string[];
};

type HomeContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  introTitle: string;
  introText: string;
  homeServices: HomeServiceContent[];
};

type HomeServiceWithPrice = HomeServiceContent & {
  priceFrom?: string;
};

type HomePageProps = {
  content: HomeContent;
  homeServices: HomeServiceWithPrice[];
  footerContent: FooterContent;
};

export default function HomePage({
  content,
  homeServices,
  footerContent,
}: HomePageProps) {
  return (
    <Layout footerContent={footerContent}>
      <Hero
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        ctaPrimary={content.heroCtaPrimary}
        ctaSecondary={content.heroCtaSecondary}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold text-ink md:text-3xl">
            {content.introTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-700 md:text-base">
            {content.introText}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {homeServices.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                priceFrom={service.priceFrom}
                description={service.description}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const { data } = getMarkdownData("home.md");
  const footerContent = getFooterContent();
  const tarifasMap = getTarifasMap();

  const content = data as HomeContent;

  const homeServices: HomeServiceWithPrice[] = content.homeServices.map(
    (service) => ({
      ...service,
      priceFrom: tarifasMap[service.id],
    })
  );

  return {
    props: {
      content,
      homeServices,
      footerContent,
    },
  };
};

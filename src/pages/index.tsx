import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { GetStaticProps } from "next";
import {
  getMarkdownData,
  getFooterContent,
  type FooterContent,
} from "@/lib/content";

type HomeContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  introTitle: string;
  introText: string;
};

type HomePageProps = {
  content: HomeContent;
  footerContent: FooterContent;
};

export default function HomePage({ content, footerContent }: HomePageProps) {
  const homeServices = [
    {
      title: "Landing page enfocada en conversión",
      priceFrom: "$",
      description:
        "Ideal para campañas, lanzamientos o servicios específicos. Una sola página bien pensada puede vender más que un sitio enorme.",
      features: [
        "Diseño a medida",
        "Texto orientado a conversión",
        "Integración con WhatsApp o formulario",
        "Optimización básica para SEO",
      ],
    },
    {
      title: "Sitio institucional para PyMEs",
      priceFrom: "$$",
      description:
        "Perfecto para empresas que necesitan una presencia profesional: quiénes somos, servicios, portfolio y contacto.",
      features: [
        "Hasta 5 secciones principales",
        "Blog para noticias o novedades",
        "Diseño adaptable a móviles",
        "Integración con redes sociales",
      ],
    },
    {
      title: "Sitio administrable con blog",
      priceFrom: "$$+",
      description:
        "Para negocios que quieren generar contenido y aparecer en Google con artículos útiles.",
      features: [
        "Panel simple para editar contenido",
        "Blog con categorización",
        "Buenas prácticas de SEO técnico",
        "Analítica básica integrada",
      ],
    },
  ];

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
              <ServiceCard key={service.title} {...service} />
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

  return {
    props: {
      content: data as HomeContent,
      footerContent,
    },
  };
};

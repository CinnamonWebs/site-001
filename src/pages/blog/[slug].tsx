import Layout from "@/components/Layout";
import { GetStaticPaths, GetStaticProps } from "next";

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  content: string[];
};

const posts: BlogPost[] = [
  {
    slug: "necesito-un-sitio-si-ya-tengo-instagram",
    title: "¿Necesito un sitio web si ya tengo Instagram?",
    date: "2024-09-01",
    content: [
      "Respuesta rápida: sí, pero no cualquier sitio.",
      "Las redes sociales son geniales para llegar a nuevas personas, pero todo lo que construís ahí no es realmente tuyo. El día que cambien el algoritmo o cierren tu cuenta, desaparece.",
      "Un sitio web propio es tu base estable. Podés derivar tráfico desde redes, campañas y boca a boca, pero la información central vive en un lugar que controlás vos.",
    ],
  },
  {
    slug: "que-deberia-tener-la-web-de-mi-pyme",
    title: "Qué debería tener la web de mi PyME (y qué no)",
    date: "2024-09-10",
    content: [
      "La mayoría de las empresas llena su web de cosas que a nadie le importan.",
      "Tu cliente quiere tres cosas: saber si le podés resolver su problema, ver rápidamente cómo trabajás y encontrar una forma fácil de contactarte.",
      "Todo lo demás es opcional. Menos ruido, más claridad.",
    ],
  },
  {
    slug: "cuanto-tarda-en-estar-listo-un-sitio-web",
    title: "¿Cuánto tarda en estar listo un sitio web?",
    date: "2024-09-20",
    content: [
      "Un proyecto puede tardar desde un par de semanas hasta varios meses.",
      "Lo que más suele demorar no es el código, sino la definición de contenido: textos, fotos, decisiones internas.",
      "Con un alcance bien definido y buena comunicación, los tiempos se acortan muchísimo.",
    ],
  },
];

type PostPageProps = {
  post: BlogPost;
};

export default function BlogPostPage({ post }: PostPageProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Layout title={post.title}>
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
            {formattedDate}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink md:text-4xl">
            {post.title}
          </h1>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-800 md:text-base">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (ctx) => {
  const slug = ctx.params?.slug as string;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
};

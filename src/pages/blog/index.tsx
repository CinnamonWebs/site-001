import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";

const posts = [
  {
    slug: "necesito-un-sitio-si-ya-tengo-instagram",
    title: "¿Necesito un sitio web si ya tengo Instagram?",
    date: "2024-09-01",
    excerpt:
      "Las redes sociales son importantes, pero no reemplazan a un sitio propio. Te cuento por qué y cuándo conviene dar el salto.",
  },
  {
    slug: "que-deberia-tener-la-web-de-mi-pyme",
    title: "Qué debería tener la web de mi PyME (y qué no)",
    date: "2024-09-10",
    excerpt:
      "Muchos sitios de empresas están llenos de cosas irrelevantes. Acá vamos a lo esencial para que tu web realmente ayude al negocio.",
  },
  {
    slug: "cuanto-tarda-en-estar-listo-un-sitio-web",
    title: "¿Cuánto tarda en estar listo un sitio web?",
    date: "2024-09-20",
    excerpt:
      "La respuesta corta: depende. La respuesta útil: te explico los factores que hacen que un proyecto sea rápido o se eternice.",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  return (
    <Layout title="Blog" description="Artículos útiles sobre desarrollo web para negocios.">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold text-ink md:text-4xl">
            Blog para negocios digitales
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-neutral-700 md:text-base">
            Consejos en lenguaje claro para que puedas tomar mejores decisiones
            sobre tu presencia online, incluso antes de contratar a nadie.
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

// src/lib/content.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

/* ---------- Tipos genéricos para TODO el contenido MD ---------- */

export type ContentImage = {
  id: string;
  src: string;
  alt: string;
};

export type ContentLink = {
  id: string;
  href: string;
  label?: string;
};

export type MarkdownFrontmatterBase = {
  title?: string;
  description?: string;
  imagenes?: ContentImage[];
  links?: ContentLink[];
  [key: string]: any;
};

export function getMarkdownData<
  T extends MarkdownFrontmatterBase = MarkdownFrontmatterBase
>(relativePath: string): { data: T; content: string } {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContent);

  const normalised: MarkdownFrontmatterBase = {
    ...data,
  };

  if (normalised.imagenes && Array.isArray(normalised.imagenes)) {
    normalised.imagenes = normalised.imagenes
      .slice(0, 2)
      .map((img) => ({
        id: img.id ?? "",
        src: img.src ?? "",
        alt: img.alt ?? "",
      }))
      .filter((img) => img.src);
  }

  if (normalised.links && Array.isArray(normalised.links)) {
    normalised.links = normalised.links
      .map((link) => ({
        id: link.id ?? "",
        href: link.href ?? "#",
        label: link.label,
      }))
      .filter((link) => link.href);
  }

  return {
    data: normalised as T,
    content,
  };
}

export function getJSONData<T = unknown>(relativePath: string): T {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  let fileContent = fs.readFileSync(fullPath, "utf8");

  fileContent = fileContent.replace(/^\uFEFF/, "").trim();
  return JSON.parse(fileContent) as T;
}

/* ---------- TARIFAS ---------- */

export type TarifasMap = Record<string, string>;

export function getTarifasMap(): TarifasMap {
  const { data } = getMarkdownData("tarifas.md");
  const map: TarifasMap = {};

  // Variante array: tarifas: [ { id, precioDesde / precio / price / monto / valor } ]
  const maybeArray = (data as any).tarifas;
  if (Array.isArray(maybeArray)) {
    for (const item of maybeArray) {
      if (!item) continue;
      const id =
        (item as any).id ??
        (item as any).clave ??
        (item as any).slug;
      const price =
        (item as any).precio ??
        (item as any).precioDesde ??
        (item as any).price ??
        (item as any).monto ??
        (item as any).valor;

      if (typeof id === "string" && typeof price === "string") {
        map[id] = price;
      }
    }
  }

  // Variante claves de primer nivel: plan_basico, plan_pro, etc.
  Object.entries(data).forEach(([key, value]) => {
    if (
      key === "title" ||
      key === "descripcion" ||
      key === "description" ||
      key === "tarifas"
    ) {
      return;
    }

    if (typeof value === "string") {
      map[key] = value;
    } else if (value && typeof value === "object") {
      const v: any = value;
      const price =
        v.precio ??
        v.precioDesde ??
        v.price ??
        v.monto ??
        v.valor;
      if (typeof price === "string") {
        map[key] = price;
      }
    }
  });

  return map;
}

/* ---------- BLOG ---------- */

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: ContentImage;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const BLOG_POSTS_DIR = path.join(CONTENT_DIR, "blog", "posts");

export function getAllBlogPosts(): BlogPostMeta[] {
  const files = fs.readdirSync(BLOG_POSTS_DIR);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");

      const { data, content } = getMarkdownData<
        MarkdownFrontmatterBase & {
          title?: string;
          date?: string;
          excerpt?: string;
          coverImage?: ContentImage;
        }
      >(path.join("blog", "posts", file));

      const rawExcerpt =
        data.excerpt ??
        content.split("\n\n")[0] ??
        "";

      const excerpt = rawExcerpt.replace(/\n/g, " ").slice(0, 200).trim();

      const imagenes = data.imagenes ?? [];
      const coverImage =
        imagenes[0] ?? data.coverImage ?? undefined;

      return {
        slug,
        title: data.title ?? "",
        date: data.date ?? "",
        excerpt,
        coverImage,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string): BlogPost {
  const mdPath = path.join("blog", "posts", `${slug}.md`);

  const { data, content } = getMarkdownData<
    MarkdownFrontmatterBase & {
      title: string;
      date: string;
      excerpt?: string;
      coverImage?: ContentImage;
    }
  >(mdPath);

  const rawExcerpt =
    data.excerpt ??
    content.split("\n\n")[0] ??
    "";

  const excerpt = rawExcerpt.replace(/\n/g, " ").slice(0, 200).trim();

  const imagenes = data.imagenes ?? [];
  const coverImage =
    imagenes[0] ?? data.coverImage ?? undefined;

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt,
    coverImage,
    content,
  };
}

/* ---------- FOOTER ---------- */

type FooterFrontmatter = MarkdownFrontmatterBase & {
  mensajeLegal?: string;
  mensajePais?: string;
  ctaBoton?: string;
};

export type FooterContent = MarkdownFrontmatterBase & {
  mensajeLegal: string;
  mensajePais: string;
  ctaBoton: string;
};

export function getFooterContent(): FooterContent {
  const { data } = getMarkdownData<FooterFrontmatter>("footer.md");

  return {
    ...data,
    mensajeLegal: data.mensajeLegal ?? "",
    mail: data.mail ?? "",
    mensajePais: data.mensajePais ?? "",
    ctaBoton: data.ctaBoton ?? "",
  };
}

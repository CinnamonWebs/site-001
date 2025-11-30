// src/lib/content.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getMarkdownData(relativePath: string) {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContent);
  return { data, content };
}

export function getJSONData<T = unknown>(relativePath: string): T {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  let fileContent = fs.readFileSync(fullPath, "utf8");

  // Eliminar BOM si existe y espacios en blanco al inicio
  fileContent = fileContent.replace(/^\uFEFF/, "").trim();
  return JSON.parse(fileContent) as T;
}

/* -------- BLOG -------- */

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

export type BlogPost = BlogPostMeta & {
  content: string; // markdown completo del post
};

export function getAllBlogPosts(): BlogPostMeta[] {
  const postsDir = path.join(CONTENT_DIR, "blog", "posts");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  const posts: BlogPostMeta[] = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContent);

    const title = (data.title as string) ?? slug;
    const date = (data.date as string) ?? "";

    const excerptFromContent = content
      .replace(/\n+/g, " ")
      .trim()
      .slice(0, 200);

    const excerpt = (data.excerpt as string) ?? excerptFromContent;

    return { slug, title, date, excerpt };
  });

  // Ordenar por fecha descendente (más nuevo primero), si hay fecha
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string): BlogPost {
  const postsDir = path.join(CONTENT_DIR, "blog", "posts");
  const fullPath = path.join(postsDir, `${slug}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContent);

  const title = (data.title as string) ?? slug;
  const date = (data.date as string) ?? "";

  const excerptFromContent = content
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 200);

  const excerpt = (data.excerpt as string) ?? excerptFromContent;

  return { slug, title, date, excerpt, content };
}

/* -------- FOOTER -------- */

export type FooterContent = {
  mensajeLegal: string;
  mensajePais: string;
  ctaBoton: string;
};

export function getFooterContent(): FooterContent {
  const { data } = getMarkdownData("footer.md");
  return data as FooterContent;
}

/* ----- helper para tarifas ----- */
export type TarifaItem = {
  id: string;
  precioDesde: string;
};

export type TarifasData = {
  tarifas: TarifaItem[];
};

export function getTarifasMap(): Record<string, string> {
  const { data } = getMarkdownData("tarifas.md");
  const tarifasData = data as TarifasData;

  const map: Record<string, string> = {};
  for (const t of tarifasData.tarifas) {
    map[t.id] = t.precioDesde;
  }
  return map;
}

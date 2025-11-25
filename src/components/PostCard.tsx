import Link from "next/link";

type PostCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

export default function PostCard({
  slug,
  title,
  excerpt,
  date,
}: PostCardProps) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
        {date}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-neutral-700">{excerpt}</p>
      <Link
        href={`/blog/${slug}`}
        className="mt-3 inline-flex text-sm font-semibold text-cinnamon hover:text-cinnamon-dark"
      >
        Leer artículo →
      </Link>
    </article>
  );
}

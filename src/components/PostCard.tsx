import Link from "next/link";
import Image from "next/image";
import type { ContentImage } from "@/lib/content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type PostCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  /** Imagen de portada opcional, viene del MD del post */
  coverImage?: ContentImage;
};

export default function PostCard({
  slug,
  title,
  excerpt,
  date,
  coverImage,
}: PostCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {coverImage && coverImage.src && (
        <div className="relative h-40 w-full">
          <Image
            src={`${basePath}${coverImage.src}`}
            alt={coverImage.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          {date}
        </p>
        <h2 className="mt-1 line-clamp-2 text-lg font-semibold text-ink">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h2>
        <p className="mt-2 line-clamp-3 text-sm text-neutral-700">{excerpt}</p>

        <div className="mt-4">
          <Link
            href={`/blog/${slug}`}
            className="text-sm font-semibold text-amber-700 hover:text-amber-800"
          >
            Leer nota →
          </Link>
        </div>
      </div>
    </article>
  );
}

import Link from "next/link";

type ProjectCardProps = {
  name: string;
  client: string;
  description: string;
  tags?: string[];
  url?: string;
};

export default function ProjectCard({
  name,
  client,
  description,
  tags,
  url,
}: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold text-ink">{name}</h3>
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
          {client}
        </p>
      </div>
      <p className="mt-2 flex-1 text-sm text-neutral-700">{description}</p>
      {tags && tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {url && (
        <div className="mt-4">
          <Link
            href={url}
            target="_blank"
            className="text-sm font-semibold text-cinnamon hover:text-cinnamon-dark"
          >
            Ver sitio
          </Link>
        </div>
      )}
    </article>
  );
}

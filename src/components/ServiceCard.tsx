type ServiceCardProps = {
  title: string;
  priceFrom?: string;
  description: string;
  features: string[];
};

export default function ServiceCard({
  title,
  priceFrom,
  description,
  features,
}: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      {priceFrom && (
        <p className="mt-1 text-sm font-semibold text-cinnamon">
          Desde {priceFrom}
        </p>
      )}
      <p className="mt-2 flex-1 text-sm text-neutral-700">{description}</p>
      <ul className="mt-3 space-y-1 text-sm text-neutral-700">
        {features.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </article>
  );
}

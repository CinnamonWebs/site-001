import React from "react";

export type ServiceCardProps = {
  title: string;
  description?: string;
  priceFrom?: string | null;
  features?: string[];
  /** En Home no queremos mostrar precios */
  showPrice?: boolean;
};

export default function ServiceCard({
  title,
  description,
  priceFrom,
  features,
  showPrice = true,
}: ServiceCardProps) {
  const hasPrice = priceFrom != null && priceFrom !== "";

  return (
    <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>

      {description && (
        <p className="mt-2 text-sm text-neutral-700">{description}</p>
      )}

      {features && features.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
          {features.map((feat, idx) => (
            <li key={idx}>{feat}</li>
          ))}
        </ul>
      )}

      {showPrice && (
        <div className="mt-4 text-sm font-medium text-amber-800">
          {hasPrice ? (
            <>
              Desde <span className="font-semibold">{priceFrom}</span>
            </>
          ) : (
            <span className="text-neutral-500">Precio a consultar</span>
          )}
        </div>
      )}
    </div>
  );
}

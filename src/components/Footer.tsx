// src/components/Footer.tsx
import Link from "next/link";

export type FooterContent = {
  mensajeLegal: string;
  mensajePais: string;
  ctaBoton: string;
};

type FooterProps = {
  content: FooterContent;
};

export default function Footer({ content }: FooterProps) {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
        <p>{content.mensajeLegal}</p>

        <div className="flex flex-wrap items-center gap-4">
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
            {content.mensajePais}
          </p>
          <Link
            href="/contacto"
            className="rounded-full border border-cinnamon px-3 py-1 text-xs font-medium text-cinnamon transition-colors hover:bg-cinnamon hover:text-white"
          >
            {content.ctaBoton}
          </Link>
        </div>
      </div>
    </footer>
  );
}

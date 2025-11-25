import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} CinnamonWebs. Todos los derechos
          reservados.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
            Desarrollado en Argentina 🇦🇷
          </p>
          <Link
            href="/contacto"
            className="rounded-full border border-cinnamon px-3 py-1 text-xs font-medium text-cinnamon transition-colors hover:bg-cinnamon hover:text-white"
          >
            Agenda una llamada
          </Link>
        </div>
      </div>
    </footer>
  );
}

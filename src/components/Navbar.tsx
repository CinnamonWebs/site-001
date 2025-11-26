import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/servicios", label: "Servicios" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-neutral-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative h-10 w-10">
            <Image
              src={`${basePath}/logo.png`}
              alt="CinnamonWeb logo"
              fill
              sizes="40px"
              priority
            />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-semibold text-ink">CinnamonWeb</p>
            <p className="text-xs text-neutral-500 uppercase tracking-[0.22em]">
                Developments
            </p>
          </div>
        </Link>

        {/* Links desktop */}
        <ul className="hidden gap-6 text-sm font-medium text-neutral-700 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-cinnamon"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-neutral-300 p-2 text-neutral-700 md:hidden"
          aria-label="Abrir menú"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            // Icono X
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            // Icono hamburguesa
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Menú desplegable en móvil */}
      {isOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <ul className="mx-auto max-w-6xl space-y-2 px-4 py-3 text-sm font-medium text-neutral-700">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-1 transition-colors hover:text-cinnamon"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

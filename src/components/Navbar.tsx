import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/servicios", label: "Servicios" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  return (
    <header className="border-b border-neutral-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src="/logo-cinnamonwebs.png"
              alt="CinnamonWebs logo"
              fill
              sizes="40px"
            />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-semibold text-ink">CinnamonWebs</p>
            <p className="text-xs text-neutral-500 uppercase tracking-[0.15em]">
              Web Development
            </p>
          </div>
        </Link>

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
      </nav>
    </header>
  );
}

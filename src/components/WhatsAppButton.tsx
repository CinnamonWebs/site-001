import Link from "next/link";

type WhatsAppButtonProps = {
  phone: string; // ej: "54911XXXXYYYY"
  message?: string;
};

export default function WhatsAppButton({
  phone,
  message = "Hola, quiero hacer una consulta sobre un sitio web 🙂",
}: WhatsAppButtonProps) {
  const urlMessage = encodeURIComponent(message);
  const href = `https://wa.me/${phone}?text=${urlMessage}`;

  return (
    <Link
      href={href}
      target="_blank"
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-105 hover:bg-green-600"
      aria-label="Contactar por WhatsApp"
    >
      {/* Ícono simple estilo WhatsApp (SVG inline) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M16 3C9.373 3 4 8.373 4 15c0 2.64.845 5.086 2.302 7.1L4 29l7.137-2.26A11.89 11.89 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10a9.86 9.86 0 0 1-4.996-1.367l-.356-.209-4.24 1.344 1.38-4.127-.23-.381A9.82 9.82 0 0 1 6 15c0-5.514 4.486-10 10-10zm-3.167 5c-.263 0-.692.101-1.054.505-.363.405-1.385 1.353-1.385 3.3 0 1.947 1.42 3.827 1.619 4.095.199.267 2.723 4.35 6.677 5.922 3.302 1.301 3.977 1.166 4.686 1.092.71-.074 2.305-.94 2.63-1.848.325-.908.325-1.687.228-1.853-.096-.166-.353-.263-.74-.46-.388-.196-2.29-1.13-2.643-1.259-.353-.13-.61-.196-.868.196-.258.392-1.002 1.259-1.228 1.516-.226.258-.453.292-.84.098-.388-.196-1.637-.603-3.12-1.923-1.155-1.023-1.935-2.285-2.162-2.677-.226-.392-.024-.604.171-.8.176-.175.388-.455.583-.683.195-.229.26-.392.39-.655.13-.262.065-.49-.033-.686-.096-.196-.848-2.094-1.19-2.868-.313-.708-.635-.733-.898-.742z"
        />
      </svg>
    </Link>
  );
}

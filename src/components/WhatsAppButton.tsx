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
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-40"
    >
      {/* Círculo blanco exterior (como en la app) */}
      <div
        className="
          flex h-16 w-16 items-center justify-center
          rounded-full bg-white
          shadow-[0_4px_12px_rgba(0,0,0,0.18)]
        "
      >
        {/* Círculo verde interior */}
        <div
          className="
            flex h-12 w-12 items-center justify-center
            rounded-full bg-[#25D366] text-white
          "
        >
          {/* Ícono WhatsApp bien centrado */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M.057 24l1.687-6.163A11.867 11.867 0 0 1 0 11.81C.02 5.304 5.324 0 11.83 0c3.181.01 6.167 1.26 8.4 3.503a11.76 11.76 0 0 1 3.48 8.39C23.69 18.4 18.384 23.7 11.88 23.7h-.006A11.9 11.9 0 0 1 7.44 22.6L.057 24zm6.597-3.807c1.676.995 3.276 1.59 5.246 1.592h.005c5.448 0 9.886-4.425 9.903-9.87.008-2.64-1.033-5.122-2.918-7.01a9.82 9.82 0 0 0-6.993-2.9c-5.47 0-9.9 4.43-9.903 9.9a9.86 9.86 0 0 0 1.596 5.26l-.999 3.648 3.063-.92zm11.387-5.47c-.074-.123-.272-.198-.57-.347-.297-.149-1.76-.868-2.03-.967-.272-.099-.47-.148-.669.149-.198.297-.768.967-.94 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.074-.149-.669-1.61-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.76-.719 2.01-1.413.248-.695.248-1.29.173-1.413z"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

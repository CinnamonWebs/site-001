import { useState, FormEvent } from "react";
import type { GetStaticProps } from "next";
import Layout from "@/components/Layout";
import { getFooterContent, type FooterContent } from "@/lib/content";
import Image from "next/image";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY as string;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type ContactPageProps = {
  footerContent: FooterContent;
};

type FormData = {
  nombre: string;
  email: string;
  telefono: string;
  negocio: string;
  mensaje: string;
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

export default function ContactPage({ footerContent }: ContactPageProps) {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    negocio: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  // Imagen lateral del formulario (ajustás el archivo acá)
  const contactImage = {
    src: "/assets/contacto/contacto003.png",
    alt: "Persona trabajando en una notebook respondiendo mensajes",
  };

  if (!WEB3FORMS_KEY) {
    console.warn(
      "Falta NEXT_PUBLIC_WEB3FORMS_KEY para el formulario de contacto."
    );
  }

  // --------- validación básica ----------
  const validate = (data: FormData): FieldErrors => {
    const newErrors: FieldErrors = {};

    if (!data.nombre.trim()) newErrors.nombre = "Ingresá tu nombre.";
    if (!data.email.trim()) {
      newErrors.email = "Ingresá tu email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Email inválido.";
    }
    if (!data.telefono.trim()) {
      newErrors.telefono = "Ingresá un teléfono de contacto.";
    }
    if (!data.mensaje.trim()) {
      newErrors.mensaje = "Contanos brevemente qué necesitás.";
    }

    return newErrors;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      setStatusMessage("Revisá los campos marcados y volvé a intentar.");
      setIsModalOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          negocio: formData.negocio,
          mensaje: formData.mensaje,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setStatusMessage(
          "Recibimos tu mensaje. En breve te vamos a responder con una propuesta clara y sin compromiso."
        );
        setIsModalOpen(true);
      } else {
        setStatus("error");
        setStatusMessage(
          data.message || "Hubo un problema al enviar el formulario."
        );
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setStatusMessage(
        "No pudimos enviar el formulario. Verificá tu conexión e intentá nuevamente."
      );
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    if (status === "success") {
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        negocio: "",
        mensaje: "",
      });
      setErrors({});
    }
    setIsModalOpen(false);
  };

  const inputBase =
    "mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-cinnamon focus:ring-1 focus:ring-cinnamon";
  const normalBorder = "border-neutral-300";
  const errorBorder = "border-red-500 focus:border-red-500 focus:ring-red-400";

  return (
    <Layout
      title="Contacto"
      description="Contactá a CinnamonWeb para hablar sobre tu próximo sitio web."
      footerContent={footerContent}
    >
      <section className="bg-sand">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-semibold text-ink md:text-4xl">
            Contáctenos
          </h1>
          <p className="mt-3 text-sm text-neutral-700 md:text-base">
            Contanos brevemente qué tipo de negocio tenés y qué esperás de tu
            sitio web. Te respondemos con una propuesta clara, sin compromiso.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-[2fr,1fr]">
            {/* FORMULARIO */}
            <form
              className="space-y-4 rounded-2xl bg-white p-6 shadow-sm"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Nombre y apellido
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  className={`${inputBase} ${
                    errors.nombre ? errorBorder : normalBorder
                  }`}
                  required
                />
                {errors.nombre && (
                  <p className="mt-1 text-xs text-red-600">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Ej: empresa@mymail.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`${inputBase} ${
                    errors.email ? errorBorder : normalBorder
                  }`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Ej: 11 4111-1111"
                  value={formData.telefono}
                  onChange={(e) => handleChange("telefono", e.target.value)}
                  className={`${inputBase} ${
                    errors.telefono ? errorBorder : normalBorder
                  }`}
                  required
                />
                {errors.telefono && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.telefono}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Tipo de negocio
                </label>
                <input
                  type="text"
                  name="negocio"
                  placeholder="Ej: estudio contable, local de ropa, consultora..."
                  value={formData.negocio}
                  onChange={(e) => handleChange("negocio", e.target.value)}
                  className={`${inputBase} ${normalBorder}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  ¿Qué necesitás?
                </label>
                <textarea
                  name="mensaje"
                  rows={5}
                  placeholder="Contame brevemente qué esperás de tu sitio web."
                  value={formData.mensaje}
                  onChange={(e) => handleChange("mensaje", e.target.value)}
                  className={`${inputBase} ${
                    errors.mensaje ? errorBorder : normalBorder
                  }`}
                  required
                />
                {errors.mensaje && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.mensaje}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-cinnamon py-2.5 text-sm font-semibold text-white hover:bg-cinnamon-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Enviando..." : "Enviar consulta"}
              </button>
            </form>

            {/* ASIDE + IMAGEN */}
            <aside className="flex h-full flex-col text-sm text-neutral-700">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                <h2 className="text-sm font-semibold text-ink">
                  Contacto directo
                </h2>
                <p className="mt-2">
                  Si preferís, podés mandar un mensaje directo por WhatsApp con
                  una breve descripción de tu proyecto.
                </p>
              </div>

              {contactImage.src && (
                <div className="mt-4 flex flex-1 items-center justify-center">
                  {/* Ajustá el porcentaje del ancho: w-[70%], w-[60%], w-[80%], etc */}
                  <div className="relative w-[100%] max-w-[260px] aspect-square overflow-hidden rounded-3xl">
                    <Image
                      src={`${basePath}${contactImage.src}`}
                      alt={contactImage.alt}
                      fill
                      sizes="(min-width: 768px) 20vw, 60vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>

        {/* Modal flotante sobre el formulario */}
        {isModalOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
            <div className="mx-4 max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-ink">
                {status === "success"
                  ? "¡Formulario enviado!"
                  : "Ups, algo no salió bien"}
              </h2>
              <p className="mt-2 text-sm text-ink/80">{statusMessage}</p>

              {status === "error" && (
                <p className="mt-2 text-xs text-ink/60">
                  Si el problema persiste, podés escribirnos directo por
                  WhatsApp desde el botón verde abajo a la derecha.
                </p>
              )}

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-ink hover:bg-neutral-100"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  const footerContent = getFooterContent();

  return {
    props: {
      footerContent,
    },
  };
};

import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

const defaultTitle = "CinnamonWebs | Desarrollo web para PyMEs y profesionales";
const defaultDescription =
  "Sitios web rápidos, modernos y optimizados para PyMEs, pequeños comercios y profesionales independientes.";

export default function Layout({
  children,
  title,
  description,
}: LayoutProps) {
  const pageTitle = title ? `${title} | CinnamonWebs` : defaultTitle;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={description ?? defaultDescription}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <div className="min-h-screen flex flex-col bg-sand text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Botón flotante de WhatsApp */}
        <WhatsAppButton phone="5491165835046" />
      </div>
    </>
  );
}

import { Html, Head, Main, NextScript } from "next/document";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Favicon CinnamonWebs */}
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

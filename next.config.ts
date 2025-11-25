import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  //  opcional, si lo estabas usando
  reactCompiler: true,

  //  necesario para GitHub Pages
  output: "export",

  //  basePath: el NOMBRE del repo de GitHub
  basePath: isProd ? "/web-site" : "",

  //  GitHub Pages no soporta image optimization de Next
  images: {
    unoptimized: true,
  },
// Esto apaga la “N” y el panelcito de dev tools
  devIndicators: false,
};

export default nextConfig;

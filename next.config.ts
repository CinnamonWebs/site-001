import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const basePath = isProd ? '/site-001' : '';

const nextConfig: NextConfig = {
  //  opcional, si lo estabas usando
  reactCompiler: true,

  //  necesario para GitHub Pages
  output: "export",

  //  basePath: el NOMBRE del repo de GitHub
  basePath,
  
  assetPrefix: basePath,

  images: { unoptimized: true },
  
  env: {
  
    NEXT_PUBLIC_BASE_PATH: basePath,
  
  },

// Esto apaga la “N” y el panelcito de dev tools
  devIndicators: false,
};

export default nextConfig;

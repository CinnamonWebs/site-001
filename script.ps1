# Crear estructura de carpetas para contenido
$root = "content"

New-Item -Path $root -ItemType Directory -Force | Out-Null
New-Item -Path "$root\portfolio" -ItemType Directory -Force | Out-Null
New-Item -Path "$root\blog" -ItemType Directory -Force | Out-Null
New-Item -Path "$root\blog\posts" -ItemType Directory -Force | Out-Null

Write-Host "Carpetas creadas bajo '$root'." -ForegroundColor Green

# ---------- home.md ----------
$homeContent = @'
---
heroTitle: "Sitios web que le dan sabor a tu negocio."
heroSubtitle: "Creamos sitios rápidos y claros para PyMEs, comercios y profesionales independientes."
heroCtaPrimary: "Quiero mi sitio web"
heroCtaSecondary: "Ver trabajos"

introTitle: "Lo que hacemos en CinnamonWebs"
introText: "Diseñamos sitios claros, rápidos y alineados con tus objetivos de negocio. Sin humo, sin complicaciones."
---
'@

Set-Content -Path "$root\home.md" -Value $home -Encoding UTF8
Write-Host "Creado: content\home.md" -ForegroundColor Green

# ---------- servicios.md ----------
$servicios = @'
---
tituloPrincipal: "Servicios de desarrollo web"
descripcionIntro: "Cada negocio es distinto, pero todos necesitan lo mismo: claridad para comunicar y facilidad para que te contacten."

servicios:
  - nombre: "Landing page de alto impacto"
    precioDesde: "$"
    descripcion: "Una página enfocada en un solo objetivo: generar contacto o conversión."
    features:
      - "Diseño adaptado a tu marca"
      - "Optimización SEO básica"
      - "Integración con WhatsApp"
      - "Contenido orientado a conversión"

  - nombre: "Sitio institucional PyME"
    precioDesde: "$$"
    descripcion: "Presencia profesional con varias secciones y contenido autoadministrable."
    features:
      - "Hasta 5 secciones"
      - "Blog simple"
      - "Diseño mobile-first"
      - "Capacitación para editar contenido"

  - nombre: "Sitio administrable con CMS"
    precioDesde: "$$+"
    descripcion: "Para negocios que generan contenido seguido y necesitan publicar fácil."
    features:
      - "Integración con Sanity"
      - "Edición sencilla sin tocar código"
      - "Buenas prácticas SEO"
      - "Soporte inicial"
---
'@

Set-Content -Path "$root\servicios.md" -Value $servicios -Encoding UTF8
Write-Host "Creado: content\servicios.md" -ForegroundColor Green

# ---------- portfolio/proyectos.json ----------
$proyectos = @'
[
  {
    "name": "Estudio Contable Río",
    "client": "Profesionales",
    "description": "Sitio institucional claro y profesional para captar clientes desde Google.",
    "tags": ["Institucional", "Blog", "SEO"],
    "url": "#"
  },
  {
    "name": "AromaCanela Productos Naturales",
    "client": "Comercio",
    "description": "Landing + catálogo simple conectada a WhatsApp.",
    "tags": ["Landing", "Catálogo", "WhatsApp"],
    "url": "#"
  },
  {
    "name": "Consultora NovaTalento",
    "client": "PyME",
    "description": "Rediseño completo: claridad del mensaje, velocidad y enfoque comercial.",
    "tags": ["Rediseño", "UX", "Optimización"],
    "url": "#"
  }
]
'@

Set-Content -Path "$root\portfolio\proyectos.json" -Value $proyectos -Encoding UTF8
Write-Host "Creado: content\portfolio\proyectos.json" -ForegroundColor Green

# ---------- nosotros.md ----------
$nosotros = @'
---
titulo: "Detrás de CinnamonWebs"
intro: "Hacer sitios web útiles, sin tecnicismos al pedo."
---

CinnamonWebs nace para ayudar a PyMEs, comercios y profesionales que necesitan presencia online, pero no tienen tiempo para pelearse con agencias enormes o soluciones sobredimensionadas.

Trabajo con un enfoque simple: entender tu negocio, tus clientes y tus objetivos. A partir de ahí, definimos qué tipo de sitio necesitás y cómo comunicar tu mensaje con claridad.

Nada de humo. Nada de complicaciones. Sitios rápidos, modernos y orientados a resultados.
'@

Set-Content -Path "$root\nosotros.md" -Value $nosotros -Encoding UTF8
Write-Host "Creado: content\nosotros.md" -ForegroundColor Green

# ---------- footer.md ----------
$footer = @'
---
mensajeLegal: "© 2025 CinnamonWebs. Todos los derechos reservados."
mensajePais: "Desarrollado en Argentina 🇦🇷"
ctaBoton: "Agenda una llamada"
---
'@

Set-Content -Path "$root\footer.md" -Value $footer -Encoding UTF8
Write-Host "Creado: content\footer.md" -ForegroundColor Green

# ---------- blog/index.md ----------
$blogIndex = @'
---
titulo: "Blog para negocios reales"
descripcion: "Consejos y guías en lenguaje claro, para que puedas tomar mejores decisiones sobre tu presencia online."
---
'@

Set-Content -Path "$root\blog\index.md" -Value $blogIndex -Encoding UTF8
Write-Host "Creado: content\blog\index.md" -ForegroundColor Green

# ---------- blog/posts/post-1.md ----------
$post1 = @'
---
title: "¿Necesito un sitio web si ya tengo Instagram?"
date: "2025-01-10"
---

Las redes sociales son geniales para llegar a más gente, pero no reemplazan a un sitio web propio.

Tu sitio es la única parte de tu negocio online que realmente controlás. Las reglas no cambian de un día para el otro, y podés construir autoridad y posicionamiento a largo plazo.
'@

Set-Content -Path "$root\blog\posts\post-1.md" -Value $post1 -Encoding UTF8
Write-Host "Creado: content\blog\posts\post-1.md" -ForegroundColor Green

Write-Host "`nEstructura de 'content' creada con éxito." -ForegroundColor Cyan

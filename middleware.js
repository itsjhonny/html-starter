// middleware.js

import { NextResponse } from "@vercel/edge";

export default function middleware(req) {
  const { pathname } = req.nextUrl;

  // Mapeamento dos códigos de idioma suportados
  const supportedLanguages = ["pt_br", "en_us", "es_es"];

  // Extrair o primeiro segmento do caminho para verificar o idioma
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment.length > 0);
  const currentLang = pathSegments[0];

  // Se o idioma não estiver presente ou não for suportado, redirecionar para 'en_us'
  if (!supportedLanguages.includes(currentLang)) {
    const url = req.nextUrl.clone();
    url.pathname = `/en_us${pathname}`;
    return NextResponse.redirect(url);
  }

  // Adicionar cabeçalhos de segurança
  const response = NextResponse.next();
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

  return response;
}

// Definir quais caminhos devem usar o middleware
export const config = {
  matcher: "/:path*",
};

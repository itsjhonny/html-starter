// middleware.js

import { NextResponse } from "@vercel/edge";

export default async function middleware(request) {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    // Redirecionamento permanente para '/en_us/'
    return NextResponse.redirect(new URL("/en_us/", request.url), 308);
  }

  // Continua o fluxo normal da requisição
  return NextResponse.next();
}

// Definição de quais caminhos devem usar o middleware
export const config = {
  matcher: "/:path*",
};

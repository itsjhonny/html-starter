import { next } from '@vercel/edge';

export default async function middleware(request) {
  const url = new URL(request.url);

  if (url.pathname === "/") {
      return new Response(null, {
          status: 308,
          headers: {
              Location: '/en_us/',
          },
      });
  }

  return undefined;
}

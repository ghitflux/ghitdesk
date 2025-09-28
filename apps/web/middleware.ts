import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "node:crypto";

const buildCsp = (nonce: string) =>
  [
    "default-src 'self'",
    "connect-src 'self' https://api.whatsapp.com https://graph.facebook.com https: wss:",
    "font-src 'self' data:",
    "img-src 'self' data: blob: https:",
    "script-src 'self' 'nonce-" + nonce + "' 'strict-dynamic'",
    "style-src 'self' 'nonce-" + nonce + "' 'unsafe-inline'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "upgrade-insecure-requests",
  ].join("; ");

export function middleware(request: NextRequest) {
  const nonce = crypto.randomBytes(16).toString("base64");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-csp-nonce", nonce);

  const hostname = request.nextUrl.hostname;
  requestHeaders.set("x-tenant-host", hostname);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", buildCsp(nonce));
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set(
    "Permissions-Policy",
    [
      "geolocation=()",
      "camera=()",
      "microphone=()",
      "payment=()",
      "usb=()",
    ].join(", ")
  );

  return response;
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};

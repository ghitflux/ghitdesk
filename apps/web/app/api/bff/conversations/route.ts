import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "../../../../lib/auth";

const apiBaseUrl = (process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1").replace(/\/$/, "");

function resolveTenant(req: NextRequest, fallback?: string | null) {
  return (
    req.headers.get("x-tenant-host") ||
    req.nextUrl.searchParams.get("tenant") ||
    fallback ||
    "public"
  );
}

async function forwardResponse(response: Response) {
  const bodyText = await response.text();
  const headers = new Headers();
  const contentType = response.headers.get("content-type");
  if (contentType) {
    headers.set("content-type", contentType);
  }
  return new NextResponse(bodyText, {
    status: response.status,
    headers,
  });
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.backendToken) {
    return NextResponse.json({ detail: "Nao autenticado" }, { status: 401 });
  }

  const tenant = resolveTenant(request, session.user?.tenant);
  const target = new URL(`${apiBaseUrl}/conversations/${request.nextUrl.search}`);

  const response = await fetch(target, {
    method: "GET",
    headers: {
      Authorization: `Token ${session.backendToken}`,
      "X-Tenant": tenant,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  return forwardResponse(response);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.backendToken) {
    return NextResponse.json({ detail: "Nao autenticado" }, { status: 401 });
  }

  const tenant = resolveTenant(request, session.user?.tenant);
  const payload = await request.json();

  const response = await fetch(`${apiBaseUrl}/conversations/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${session.backendToken}`,
      "X-Tenant": tenant,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  return forwardResponse(response);
}

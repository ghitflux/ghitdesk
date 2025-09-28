import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";

import { AppProviders } from "../components/providers/app-providers";

export const metadata: Metadata = {
  title: {
    default: "GhitDesk",
    template: "%s | GhitDesk",
  },
  description:
    "Omnichannel multi-tenant com inbox veloz, SLA confiável e IA proprietária (Ghoat).",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const nonce = headers().get("x-csp-nonce");

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-surface text-foreground antialiased">
        <AppProviders nonce={nonce}>{children}</AppProviders>
      </body>
    </html>
  );
}

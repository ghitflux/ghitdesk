"use client";

import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";

import { CspNonceProvider } from "./csp-nonce-provider";

type Props = PropsWithChildren<{ nonce: string | null }>;

export function AppProviders({ nonce, children }: Props) {
  return (
    <SessionProvider>
      <CspNonceProvider value={nonce}>{children}</CspNonceProvider>
    </SessionProvider>
  );
}

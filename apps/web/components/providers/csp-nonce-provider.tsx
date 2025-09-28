"use client";

import { createContext, useContext, type PropsWithChildren } from "react";

const CspNonceContext = createContext<string | null>(null);

type Props = PropsWithChildren<{ value: string | null }>;

export function CspNonceProvider({ value, children }: Props) {
  return <CspNonceContext.Provider value={value}>{children}</CspNonceContext.Provider>;
}

export function useCspNonce() {
  return useContext(CspNonceContext);
}

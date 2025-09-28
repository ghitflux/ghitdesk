"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");
    const tenant = String(formData.get("tenant") ?? "");

    const callbackUrl = searchParams?.get("callbackUrl") ?? "/";

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      tenant,
      callbackUrl,
    });

    setIsLoading(false);

    if (!result?.ok) {
      setError(result?.error ?? "Nao foi possível autenticar.");
      return;
    }

    router.push(callbackUrl);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted" htmlFor="tenant">
          Tenant
        </label>
        <Input id="tenant" name="tenant" placeholder="tenant1" required autoComplete="organization" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted" htmlFor="username">
          Usuário
        </label>
        <Input id="username" name="username" placeholder="agente" required autoComplete="username" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted" htmlFor="password">
          Senha
        </label>
        <Input id="password" type="password" name="password" required autoComplete="current-password" />
      </div>
      {error ? <p className="text-sm text-danger-500">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Autenticando..." : "Entrar"}
      </Button>
    </form>
  );
}

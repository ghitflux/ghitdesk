import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { z } from "zod";

const credentialsSchema = z.object({
  username: z.string().min(1, "Informe o usuário"),
  password: z.string().min(1, "Informe a senha"),
  tenant: z.string().min(1, "Informe o tenant"),
});

const apiBaseUrl = (process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1").replace(/\/$/, "");

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
        tenant: { label: "Tenant", type: "text" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const { username, password, tenant } = parsed.data;
        const response = await fetch(`${apiBaseUrl}/auth/login/`, {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            "X-Tenant": tenant,
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          const detail = (await response.json().catch(() => null)) as { detail?: string } | null;
          throw new Error(detail?.detail ?? "Falha na autenticacao");
        }

        const data = (await response.json()) as {
          token: string;
          user: { id: number | string; username: string; email?: string; full_name?: string };
          tenant: string;
        };

        return {
          id: String(data.user.id ?? data.user.username),
          name: data.user.full_name || data.user.username,
          email: data.user.email,
          tenant: data.tenant,
          token: data.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.backendToken = (user as { token?: string }).token;
        token.tenant = (user as { tenant?: string }).tenant;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.tenant = typeof token.tenant === "string" ? token.tenant : undefined;
      }
      if (typeof token.backendToken === "string") {
        (session as { backendToken?: string }).backendToken = token.backendToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};

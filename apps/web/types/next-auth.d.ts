import NextAuth, { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    backendToken?: string;
    user?: DefaultSession["user"] & {
      tenant?: string;
    };
  }

  interface User {
    tenant?: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendToken?: string;
    tenant?: string;
  }
}

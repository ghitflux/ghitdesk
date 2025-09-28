import type { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { SignInForm } from "../../components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Entrar",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Acessar GhitDesk</CardTitle>
          <CardDescription>Informe tenant, usuário e senha corporativa.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}

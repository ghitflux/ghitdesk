"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "../ui/toast";

export function AiSuggestion() {
  const [open, setOpen] = useState(false);

  const handleAccept = () => {
    setOpen(true);
    setTimeout(() => setOpen(false), 4000);
  };

  return (
    <ToastProvider swipeDirection="right">
      <section className="space-y-3">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Sugestão do Ghoat</h2>
            <p className="text-sm text-muted">Respostas contextuais com fonte citada via RAG por tenant.</p>
          </div>
          <Button variant="ghost" size="sm" className="gap-1">
            <Sparkles className="h-4 w-4" /> Nova sugestão
          </Button>
        </header>
        <Textarea
          readOnly
          value="Olá Ana! Verifiquei que seu pedido #3210 está com entrega prevista para amanhã (fonte: ERP > Pedidos). Posso acompanhar até a confirmação de recebimento."
        />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm">
            Regerar
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Aceitar e enviar
          </Button>
        </div>
      </section>
      <Toast open={open} onOpenChange={setOpen}>
        <ToastTitle>Resposta sugerida aplicada</ToastTitle>
        <ToastDescription>Registro auditável criado com a referência da base do tenant.</ToastDescription>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

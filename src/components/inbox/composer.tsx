import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Paperclip, 
  Smile, 
  FileText,
  Mic
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface ComposerProps {
  onSendMessage?: (content: string, attachments?: File[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

const messageTemplates = [
  {
    name: "Saudação",
    content: "Olá! Como posso ajudar você hoje?"
  },
  {
    name: "Aguardando informações",
    content: "Obrigado pelo contato. Estou analisando sua solicitação e retorno em breve com mais informações."
  },
  {
    name: "Problema resolvido",
    content: "Ótimo! Problema resolvido. Há mais alguma coisa em que posso ajudar?"
  },
  {
    name: "Encerramento",
    content: "Obrigado pelo contato! Se precisar de mais alguma coisa, estarei aqui para ajudar."
  }
];

export function Composer({ 
  onSendMessage, 
  disabled = false,
  placeholder = "Digite sua mensagem..." 
}: ComposerProps) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!message.trim() && attachments.length === 0) return;
    
    onSendMessage?.(message, attachments);
    setMessage("");
    setAttachments([]);
    
    // Focus back to textarea
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const insertTemplate = (template: string) => {
    setMessage(template);
    textareaRef.current?.focus();
  };

  return (
    <div className="border-t border-border bg-surface p-4">
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <Badge
              key={index}
              variant="outline"
              className="flex items-center gap-2 px-2 py-1"
            >
              <span className="text-xs truncate max-w-32">{file.name}</span>
              <button
                onClick={() => removeAttachment(index)}
                className="text-xs hover:text-destructive"
                aria-label={`Remover ${file.name}`}
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* Message Input */}
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-h-[44px] max-h-32 resize-none bg-background border-border focus:border-brand-primary"
            disabled={disabled}
            rows={1}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* File Attachment */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            aria-label="Anexar arquivo"
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          {/* Templates */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                disabled={disabled}
                aria-label="Modelos de mensagem"
              >
                <FileText className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Modelos de Mensagem</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {messageTemplates.map((template, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => insertTemplate(template.content)}
                  className="flex flex-col items-start gap-1 p-3"
                >
                  <span className="font-medium">{template.name}</span>
                  <span className="text-sm text-muted-foreground line-clamp-2">
                    {template.content}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Emoji Picker */}
          <Button
            variant="ghost"
            size="sm"
            disabled={disabled}
            aria-label="Adicionar emoji"
          >
            <Smile className="h-4 w-4" />
          </Button>

          {/* Voice Message */}
          <Button
            variant="ghost"
            size="sm"
            disabled={disabled}
            aria-label="Mensagem de voz"
          >
            <Mic className="h-4 w-4" />
          </Button>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={disabled || (!message.trim() && attachments.length === 0)}
            className="bg-brand-primary hover:bg-brand-secondary text-primary-foreground"
            size="sm"
            aria-label="Enviar mensagem"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
        accept="image/*,application/pdf,.doc,.docx,.txt"
      />

      {/* Keyboard Shortcut Hint */}
      <div className="mt-2 text-xs text-muted-foreground">
        Ctrl + Enter para enviar
      </div>
    </div>
  );
}
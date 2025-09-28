import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  title?: string;
  showSearch?: boolean;
}

export function TopBar({ title = "Dashboard", showSearch = true }: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4">
        <SidebarTrigger className="hover:bg-surface" />
        
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        </div>

        {showSearch && (
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar conversas, tickets ou contatos..."
                className="pl-10 bg-surface border-border focus:border-brand-primary"
                aria-label="Busca global"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-brand-primary hover:text-primary-foreground"
            aria-label="Criar novo ticket"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Ticket
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="relative hover:bg-surface"
                aria-label="Notificações"
              >
                <Bell className="h-4 w-4" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="font-semibold">Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                <div className="flex items-center gap-2 w-full">
                  <div className="h-2 w-2 bg-danger rounded-full"></div>
                  <span className="font-medium text-sm">SLA a vencer</span>
                  <span className="text-xs text-muted-foreground ml-auto">2min</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Ticket T-003 vence em 5 minutos
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                <div className="flex items-center gap-2 w-full">
                  <div className="h-2 w-2 bg-warning rounded-full"></div>
                  <span className="font-medium text-sm">Nova conversa</span>
                  <span className="text-xs text-muted-foreground ml-auto">5min</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Maria Silva iniciou conversa no WhatsApp
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                <div className="flex items-center gap-2 w-full">
                  <div className="h-2 w-2 bg-brand-primary rounded-full"></div>
                  <span className="font-medium text-sm">Ticket atribuído</span>
                  <span className="text-xs text-muted-foreground ml-auto">10min</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  T-007 foi atribuído a você
                </p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
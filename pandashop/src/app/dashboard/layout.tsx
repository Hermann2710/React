"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { GlobalSearch } from "@/components/dashboard/global-search"; // Importez-le ici
import { useAuth } from "@/contexts/auth-context";
import { Loader2 } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground animate-pulse">
            Chargement de votre session...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <DashboardHeader />

          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

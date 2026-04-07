import React from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh grid-cols-1 lg:grid-cols-2 bg-background">
      <div className="absolute right-4 top-4 z-50 md:right-8 md:top-8">
        <ThemeToggle />
      </div>

      <div className="relative hidden lg:flex flex-col bg-muted overflow-hidden border-r border-border">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-500 dark:brightness-[0.7] grayscale-[0.2]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=1600&auto=format&fit=crop')",
          }}
        />

        <div className="absolute inset-0 z-10 bg-linear-to-t from-background/90 via-background/20 to-transparent" />

        <div className="relative z-20 flex h-full flex-col justify-between p-10 text-foreground">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
              P
            </div>
            <span>PandaShop</span>
          </div>

          <div className="mt-auto max-w-md">
            <blockquote className="space-y-3">
              <p className="text-2xl font-medium leading-tight tracking-tight text-balance">
                "La plateforme e-commerce la plus robuste pour gérer vos
                produits avec Next.js et Laravel."
              </p>
              <footer className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-px w-8 bg-muted-foreground/30" />
                PandaShop Team
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      <main className="flex items-center justify-center p-6 sm:p-12 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-87.5">
          <div className="flex justify-center lg:hidden mb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-2xl shadow-xl">
              P
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

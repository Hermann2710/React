"use client";

import * as React from "react";
import { Search } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Command>
      <button
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center h-9 w-64 rounded-md bg-muted/50 px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors border"
      >
        <Search className="mr-2 h-4 w-4 opacity-50" />
        <span className="flex-1 text-left">Rechercher...</span>
        <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Rechercher une page..." />
        <CommandList>
          <CommandEmpty>Aucun résultat.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => {
                router.push("/dashboard");
                setOpen(false);
              }}
            >
              Tableau de bord
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push("/dashboard/products");
                setOpen(false);
              }}
            >
              Produits
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </Command>
  );
}

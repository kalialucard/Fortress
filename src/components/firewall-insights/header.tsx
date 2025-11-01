import { ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import { ClientOnly } from '../client-only';

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold font-headline tracking-tight text-foreground">
            Fortress
          </h1>
        </div>
        <div className="ml-auto">
          <ClientOnly>
            <ThemeToggle />
          </ClientOnly>
        </div>
      </div>
    </header>
  );
}

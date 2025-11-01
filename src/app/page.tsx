import { Header } from '@/components/firewall-insights/header';
import { MainContent } from '@/components/firewall-insights/main-content';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        <MainContent />
      </main>
    </div>
  );
}

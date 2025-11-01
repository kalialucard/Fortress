'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Terminal } from 'lucide-react';
import { getAiSummary } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

export function AiSummaryTab({ rawRuleset }: { rawRuleset: string }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setSummary(null);
    const { summary, error } = await getAiSummary(rawRuleset);
    if (error) {
      setError(error);
    } else {
      setSummary(summary);
    }
    setIsLoading(false);
  };

  return (
    <Card className="shadow-none border-dashed">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Sparkles className="text-accent" />
          AI-Powered Summary
        </CardTitle>
        <CardDescription>
          Generate a natural language summary of your ruleset using GenAI. This sends your ruleset to a third-party service.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!summary && !isLoading && !error && (
            <div className="text-center p-4">
                <Button onClick={handleGenerate} disabled={isLoading}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Summary
                </Button>
            </div>
        )}

        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Generation Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {summary && (
          <div className="prose prose-sm max-w-none p-4 bg-muted/50 rounded-lg border">
            <p>{summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

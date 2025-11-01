'use client';

import { useState } from 'react';
import { parseAndAnalyzeRuleset } from '@/app/actions';
import type { AnalysisResult } from '@/lib/types';
import { RulesInput } from './rules-input';
import { ResultsDisplay } from './results-display';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getDefaultRuleset } from '@/lib/parser';

export function MainContent() {
  const [inputText, setInputText] = useState(getDefaultRuleset());
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    const { result, error } = await parseAndAnalyzeRuleset(inputText);
    if (error) {
      setError(error);
    } else {
      setResult(result);
    }
    setIsLoading(false);
  };
  
  const handleClear = () => {
    setInputText('');
    setResult(null);
    setError(null);
  }

  return (
    <div className="space-y-8">
      <RulesInput
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onAnalyze={handleAnalyze}
        onClear={handleClear}
        isLoading={isLoading}
      />

      {isLoading && <ResultsSkeleton />}

      {error && (
        <Alert variant="destructive" className="max-w-4xl mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Analysis Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {result && <ResultsDisplay result={result} rawRuleset={inputText} />}
    </div>
  );
}

function ResultsSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-96" />
            <div className="border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
    )
}

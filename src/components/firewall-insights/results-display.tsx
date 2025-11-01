'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { AnalysisResult } from '@/lib/types';
import { SummaryTab } from './summary-tab';
import { RulesTab } from './rules-tab';
import { AnalysisTab } from './analysis-tab';
import { VisualizeTab } from './visualize-tab';
import { AiSummaryTab } from './ai-summary-tab';
import { BookOpen, ListOrdered, ShieldAlert, BarChart3, Sparkles } from 'lucide-react';

interface ResultsDisplayProps {
  result: AnalysisResult;
  rawRuleset: string;
}

export function ResultsDisplay({ result, rawRuleset }: ResultsDisplayProps) {
  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto">
        <TabsTrigger value="summary"><BookOpen className="mr-2 h-4 w-4" />Summary</TabsTrigger>
        <TabsTrigger value="rules"><ListOrdered className="mr-2 h-4 w-4" />Rules</TabsTrigger>
        <TabsTrigger value="analysis"><ShieldAlert className="mr-2 h-4 w-4" />Analysis</TabsTrigger>
        <TabsTrigger value="visualize"><BarChart3 className="mr-2 h-4 w-4" />Visualize</TabsTrigger>
        <TabsTrigger value="ai-summary"><Sparkles className="mr-2 h-4 w-4" />AI Summary</TabsTrigger>
      </TabsList>
      <div className="mt-4">
        <TabsContent value="summary" className="fade-in">
          <SummaryTab summary={result.summary} />
        </TabsContent>
        <TabsContent value="rules" className="fade-in">
          <RulesTab rules={result.rules} />
        </TabsContent>
        <TabsContent value="analysis" className="fade-in">
          <AnalysisTab issues={result.analysis} />
        </TabsContent>
        <TabsContent value="visualize" className="fade-in">
            <VisualizeTab summary={result.summary} />
        </TabsContent>
        <TabsContent value="ai-summary" className="fade-in">
          <AiSummaryTab rawRuleset={rawRuleset} />
        </TabsContent>
      </div>
    </Tabs>
  );
}

// Add this to your globals.css for the fade-in effect
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
*/

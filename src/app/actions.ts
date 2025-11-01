
'use server';

import { parseAndAnalyze } from '@/lib/parser';
import type { AnalysisResult } from '@/lib/types';
import { summarizeRulesetWithLLM } from '@/ai/flows/summarize-ruleset-llm';

export async function parseAndAnalyzeRuleset(rawRules: string): Promise<{ result: AnalysisResult | null; error: string | null }> {
  if (!rawRules || rawRules.trim().length === 0) {
    return { result: null, error: 'Ruleset input cannot be empty.' };
  }
  if (rawRules.length > 50000) {
      return { result: null, error: 'Ruleset is too large. Please provide an input with fewer than 50,000 characters.' };
  }

  try {
    const result = parseAndAnalyze(rawRules);
    if(result.rules.length === 0) {
      return { result: null, error: 'No valid rules found. Please check the format of your input.' };
    }
    return { result, error: null };
  } catch (e) {
    console.error(e);
    return { result: null, error: 'An unexpected error occurred during parsing.' };
  }
}

export async function getAiSummary(ruleset: string): Promise<{ summary: string | null; error:string | null }> {
  if (!process.env.GOOGLE_API_KEY) {
      return { summary: null, error: 'AI Summarization is not configured on the server. An API key is required.' };
  }
  if (!ruleset || ruleset.trim().length === 0) {
    return { summary: null, error: 'Cannot generate summary for an empty ruleset.' };
  }
   if (ruleset.length > 50000) {
      return { summary: null, error: 'Ruleset is too large for AI summarization. Please use a smaller input.' };
  }

  try {
    const result = await summarizeRulesetWithLLM({ ruleset });
    return { summary: result.summary, error: null };
  } catch (e) {
    console.error(e);
    return { summary: null, error: 'Failed to generate AI summary due to a server-side error.' };
  }
}

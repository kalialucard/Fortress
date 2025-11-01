'use server';
/**
 * @fileOverview A Genkit flow for summarizing a ruleset using an LLM.
 *
 * - summarizeRulesetWithLLM - A function that handles the summarization process.
 * - SummarizeRulesetWithLLMInput - The input type for the summarizeRulesetWithLLM function.
 * - SummarizeRulesetWithLLMOutput - The return type for the summarizeRulesetWithLLM function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRulesetWithLLMInputSchema = z.object({
  ruleset: z.string().describe('The ruleset to summarize.'),
});
export type SummarizeRulesetWithLLMInput = z.infer<typeof SummarizeRulesetWithLLMInputSchema>;

const SummarizeRulesetWithLLMOutputSchema = z.object({
  summary: z.string().describe('The enhanced natural-language summary of the ruleset.'),
});
export type SummarizeRulesetWithLLMOutput = z.infer<typeof SummarizeRulesetWithLLMOutputSchema>;

export async function summarizeRulesetWithLLM(
  input: SummarizeRulesetWithLLMInput
): Promise<SummarizeRulesetWithLLMOutput> {
  return summarizeRulesetWithLLMFlow(input);
}

const summarizeRulesetWithLLMPrompt = ai.definePrompt({
  name: 'summarizeRulesetWithLLMPrompt',
  input: {schema: SummarizeRulesetWithLLMInputSchema},
  output: {schema: SummarizeRulesetWithLLMOutputSchema},
  prompt: `You are an expert cybersecurity analyst. Please provide a concise yet comprehensive summary of the following firewall ruleset, highlighting its purpose, key configurations, and any potential security concerns:\n\nRuleset: {{{ruleset}}}`,
});

const summarizeRulesetWithLLMFlow = ai.defineFlow(
  {
    name: 'summarizeRulesetWithLLMFlow',
    inputSchema: SummarizeRulesetWithLLMInputSchema,
    outputSchema: SummarizeRulesetWithLLMOutputSchema,
  },
  async input => {
    const {output} = await summarizeRulesetWithLLMPrompt(input);
    return output!;
  }
);

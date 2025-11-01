#!/usr/bin/env node
import { promises as fs } from 'fs';
import { parseAndAnalyze } from './lib/parser';
import { getAiSummary } from './app/actions';
import 'dotenv/config';

const BOLD = '\x1b[1m';
const BLUE = '\x1b[34m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

const SEVERITY_COLOR: Record<string, string> = {
  high: RED,
  medium: YELLOW,
  low: BLUE,
  info: RESET,
};

async function main() {
  const args = process.argv.slice(2);
  const filePath = args.find(arg => !arg.startsWith('--'));
  const asJson = args.includes('--json');
  const doAiSummary = args.includes('--ai-summary');

  let rawRuleset: string;

  try {
    if (filePath) {
      rawRuleset = await fs.readFile(filePath, 'utf-8');
    } else {
      // Read from stdin
      rawRuleset = await new Promise((resolve) => {
        let data = '';
        process.stdin.on('data', chunk => data += chunk);
        process.stdin.on('end', () => resolve(data));
      });
    }

    if (!rawRuleset.trim()) {
        console.error(`${RED}Error: Input is empty. Please provide a file or pipe data to stdin.${RESET}`);
        console.log('\nUsage: firewall-insights-cli [path/to/rules.txt] [--json] [--ai-summary]');
        process.exit(1);
    }

    const { result, error } = parseAndAnalyze(rawRuleset);

    if (error || !result) {
      console.error(`${RED}Error parsing ruleset: ${error || 'Unknown error'}${RESET}`);
      process.exit(1);
    }
    
    let aiSummary: string | null = null;
    if (doAiSummary) {
        if (!process.env.GOOGLE_API_KEY) {
            console.warn(`${YELLOW}Warning: GOOGLE_API_KEY environment variable is not set. Skipping AI summary.${RESET}`);
        } else {
            const { summary, error: aiError } = await getAiSummary(rawRuleset);
            if (aiError) {
                console.warn(`${YELLOW}Warning: Could not generate AI summary. ${aiError}${RESET}`);
            } else {
                aiSummary = summary;
            }
        }
    }
    
    const fullResult = { ...result, aiSummary };


    if (asJson) {
      console.log(JSON.stringify(fullResult, null, 2));
    } else {
      // Summary
      console.log(`${BOLD}${BLUE}--- Firewall Ruleset Summary ---${RESET}`);
      console.log(`Total Rules: ${BOLD}${result.summary.totalRules}${RESET}`);
      console.log(`High Risk Rules: ${BOLD}${result.summary.highRiskRulesCount}${RESET}`);
      console.log(`Avg. Risk Score: ${BOLD}${result.summary.averageRiskScore}${RESET}`);

      // AI Summary
      if (aiSummary) {
        console.log(`\n${BOLD}${BLUE}--- AI-Powered Summary ---${RESET}`);
        console.log(aiSummary);
      }

      // Analysis
      if (result.analysis.length > 0) {
        console.log(`\n${BOLD}${BLUE}--- Automated Analysis (${result.analysis.length} issues found) ---${RESET}`);
        result.analysis.forEach(issue => {
          const color = SEVERITY_COLOR[issue.severity] || RESET;
          console.log(`[${color}${issue.severity.toUpperCase()}${RESET}] ${issue.message}`);
          console.log(`   ${color}└─ ${issue.ruleRaw}${RESET}`);
        });
      } else {
        console.log(`\n${BOLD}${GREEN}--- Automated Analysis ---${RESET}`);
        console.log(`${GREEN}No common issues found.${RESET}`);
      }

      // Rules
      console.log(`\n${BOLD}${BLUE}--- All Rules (${result.rules.length}) ---${RESET}`);
      console.log(
          `Chain      Protocol   Source              Destination         Target      Risk`
      );
       console.log(
          `---------- ---------- ------------------- ------------------- ----------- ----`
      );
      result.rules.forEach(rule => {
        const riskColor = rule.riskScore > 7 ? RED : rule.riskScore > 4 ? YELLOW : GREEN;
        console.log(
          `${rule.chain.padEnd(11)}` +
          `${rule.protocol.padEnd(11)}` +
          `${rule.source.padEnd(20)}` +
          `${rule.destination.padEnd(20)}` +
          `${rule.target.padEnd(12)}` +
          `${riskColor}${rule.riskScore}${RESET}`
        );
      });
    }

  } catch (err: any) {
    if (err.code === 'ENOENT') {
      console.error(`${RED}Error: File not found at '${filePath}'${RESET}`);
    } else {
      console.error(`${RED}An unexpected error occurred:`, err.message, RESET);
    }
    process.exit(1);
  }
}

main();

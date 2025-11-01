
export type RuleAction = 'ACCEPT' | 'DROP' | 'REJECT' | 'LOG' | 'REDIRECT' | 'MASQUERADE' | 'DNAT' | 'SNAT' | 'UNKNOWN';
export type Protocol = 'tcp' | 'udp' | 'icmp' | 'all' | 'unknown';
export type AnalysisSeverity = 'high' | 'medium' | 'low' | 'info';

export interface FirewallRule {
  id: string;
  chain: string;
  protocol: Protocol;
  source: string;
  destination: string;
  target: RuleAction;
  raw: string;
  riskScore: number;
  description: string;
}

export interface RuleAnalysisIssue {
  id: string;
  ruleId: string;
  message: string;
  severity: AnalysisSeverity;
  ruleRaw: string;
}

export interface RulesetSummary {
  totalRules: number;
  ruleCountByAction: { name: string; value: number }[];
  ruleCountByProtocol: { name: string; value: number }[];
  averageRiskScore: number;
  highRiskRulesCount: number;
  mediumRiskRulesCount: number;
}

export interface AnalysisResult {
  rules: FirewallRule[];
  summary: RulesetSummary;
  analysis: RuleAnalysisIssue[];
}

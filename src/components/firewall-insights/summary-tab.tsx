import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ShieldAlert, ShieldCheck, List } from 'lucide-react';
import type { RulesetSummary } from '@/lib/types';

interface SummaryTabProps {
  summary: RulesetSummary;
}

const StatCard = ({ title, value, icon: Icon, description, colorClass = 'text-primary' }: { title: string, value: string | number, icon: React.ElementType, description: string, colorClass?: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-5 w-5 text-muted-foreground ${colorClass}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export function SummaryTab({ summary }: SummaryTabProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Rules"
        value={summary.totalRules}
        icon={List}
        description="Total number of rules parsed."
        colorClass="text-primary"
      />
      <StatCard
        title="High Risk Rules"
        value={summary.highRiskRulesCount}
        icon={ShieldAlert}
        description="Rules with a risk score > 7."
        colorClass="text-destructive"
      />
      <StatCard
        title="Medium Risk Rules"
        value={summary.mediumRiskRulesCount}
        icon={Shield}
        description="Rules with a risk score between 5 and 7."
        colorClass="text-yellow-500"
      />
      <StatCard
        title="Average Risk Score"
        value={summary.averageRiskScore}
        icon={ShieldCheck}
        description="Average risk score across all rules."
        colorClass="text-green-500"
      />
    </div>
  );
}

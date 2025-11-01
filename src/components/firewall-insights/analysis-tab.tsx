import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { RuleAnalysisIssue } from '@/lib/types';
import { ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';

const severityMap = {
  high: {
    icon: ShieldAlert,
    className: 'border-destructive/50 text-destructive',
    iconClass: 'text-destructive',
  },
  medium: {
    icon: ShieldQuestion,
    className: 'border-yellow-500/50 text-yellow-600',
    iconClass: 'text-yellow-500',
  },
  low: {
    icon: ShieldCheck,
    className: 'border-blue-500/50 text-blue-600',
    iconClass: 'text-blue-500',
  },
  info: {
    icon: ShieldCheck,
    className: 'border-gray-500/50 text-gray-600',
    iconClass: 'text-gray-500',
  }
};

export function AnalysisTab({ issues }: { issues: RuleAnalysisIssue[] }) {
  if (issues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg bg-muted/50">
        <ShieldCheck className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold font-headline">No Issues Found</h3>
        <p className="text-muted-foreground">The automated analysis did not find any common issues.</p>
      </div>
    );
  }
  
  const sortedIssues = [...issues].sort((a, b) => {
      const severityOrder = { high: 0, medium: 1, low: 2, info: 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
  })

  return (
    <div className="space-y-4">
      {sortedIssues.map(issue => {
        const { icon: Icon, className, iconClass } = severityMap[issue.severity];
        return (
          <Alert key={issue.id} className={className}>
            <Icon className={`h-5 w-5 ${iconClass}`} />
            <AlertTitle className="ml-8 font-bold capitalize">{issue.severity} Risk: {issue.message}</AlertTitle>
            <AlertDescription className="ml-8">
              <code className="text-xs font-code bg-secondary p-1 rounded-sm">{issue.ruleRaw}</code>
            </AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
}

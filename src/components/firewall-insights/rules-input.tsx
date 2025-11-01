'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Play, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface RulesInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAnalyze: () => void;
  onClear: () => void;
  isLoading: boolean;
}

export function RulesInput({ value, onChange, onAnalyze, onClear, isLoading }: RulesInputProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Input Ruleset</CardTitle>
        <CardDescription>
          Paste your firewall ruleset below. Supports iptables-save format.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-4">
          <Textarea
            placeholder="Paste your firewall rules here..."
            value={value}
            onChange={onChange}
            className="min-h-[250px] font-code text-sm bg-muted/40 focus:bg-background transition-colors"
            disabled={isLoading}
          />
          <div className="flex flex-col sm:flex-row gap-2 justify-end">
            <Button
              variant="outline"
              onClick={onClear}
              disabled={isLoading || !value}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
            <Button onClick={onAnalyze} disabled={isLoading || !value}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              Analyze
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

'use client'
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from '@/components/ui/badge';
import type { FirewallRule, Protocol } from '@/lib/types';
import { ChevronDown, Filter, ArrowDownUp, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '../ui/button';

const getRiskBadgeVariant = (score: number): 'destructive' | 'secondary' | 'default' => {
  if (score > 7) return 'destructive';
  if (score > 4) return 'secondary';
  return 'default';
};

const getProtocolBadgeClass = (protocol: Protocol): string => {
    switch (protocol) {
        case 'tcp': return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-700';
        case 'udp': return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/50 dark:text-purple-200 dark:border-purple-700';
        case 'icmp': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-200 dark:border-green-700';
        default: return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500';
    }
}

export function RulesTab({ rules }: { rules: FirewallRule[] }) {
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState<keyof FirewallRule | 'riskScore'>('riskScore');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
    const [chainFilter, setChainFilter] = useState('all');

    const filteredAndSortedRules = rules
        .filter(rule => 
            (chainFilter === 'all' || rule.chain === chainFilter) &&
            (filter === '' || Object.values(rule).some(val => String(val).toLowerCase().includes(filter.toLowerCase())))
        )
        .sort((a, b) => {
            const valA = a[sortKey];
            const valB = b[sortKey];
            if (valA < valB) return sortDir === 'asc' ? -1 : 1;
            if (valA > valB) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });
    
    const uniqueChains = ['all', ...Array.from(new Set(rules.map(r => r.chain)))];

    const handleSort = (key: keyof FirewallRule | 'riskScore') => {
        if (sortKey === key) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('desc');
        }
    }

    const handleExport = () => {
        const dataStr = JSON.stringify(filteredAndSortedRules, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

        const exportFileDefaultName = 'firewall-rules.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    const SortableHeader = ({ tKey, label }: { tKey: keyof FirewallRule | 'riskScore', label: string }) => (
        <TableHead className="cursor-pointer" onClick={() => handleSort(tKey)}>
            <div className="flex items-center gap-2">
                {label}
                {sortKey === tKey && <ArrowDownUp className="h-3 w-3" />}
            </div>
        </TableHead>
    );

  return (
    <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Filter rules..." value={filter} onChange={e => setFilter(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2">
                <Select value={chainFilter} onValueChange={setChainFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by chain" />
                    </SelectTrigger>
                    <SelectContent>
                        {uniqueChains.map(chain => <SelectItem key={chain} value={chain}>{chain === 'all' ? 'All Chains' : chain}</SelectItem>)}
                    </SelectContent>
                </Select>
                 <Button variant="outline" onClick={handleExport} disabled={filteredAndSortedRules.length === 0}>
                    <Download className="mr-2 h-4 w-4" />
                    Export JSON
                </Button>
            </div>
        </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <SortableHeader tKey="chain" label="Chain" />
              <SortableHeader tKey="protocol" label="Protocol" />
              <SortableHeader tKey="source" label="Source" />
              <SortableHeader tKey="destination" label="Destination" />
              <SortableHeader tKey="target" label="Target" />
              <SortableHeader tKey="riskScore" label="Risk" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedRules.map(rule => (
              <Collapsible asChild key={rule.id} tagName="tbody">
                  <>
                    <TableRow className="hover:bg-muted/50">
                        <TableCell>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-9 p-0 data-[state=open]:rotate-180 transition-transform">
                                <ChevronDown className="h-4 w-4" />
                                <span className="sr-only">Toggle details</span>
                            </Button>
                        </CollapsibleTrigger>
                        </TableCell>
                        <TableCell className="font-medium">{rule.chain}</TableCell>
                        <TableCell><Badge variant="outline" className={getProtocolBadgeClass(rule.protocol)}>{rule.protocol}</Badge></TableCell>
                        <TableCell><code className="font-code">{rule.source}</code></TableCell>
                        <TableCell><code className="font-code">{rule.destination}</code></TableCell>
                        <TableCell>{rule.target}</TableCell>
                        <TableCell>
                        <Badge variant={getRiskBadgeVariant(rule.riskScore)}>{rule.riskScore}</Badge>
                        </TableCell>
                    </TableRow>
                    <CollapsibleContent asChild>
                        <TableRow className="bg-muted/50">
                            <TableCell colSpan={7} className="p-0">
                                <div className="p-4 space-y-2">
                                <p className="text-sm text-muted-foreground">{rule.description}</p>
                                <code className="block text-xs font-code p-2 bg-background rounded-md border">{rule.raw}</code>
                                </div>
                            </TableCell>
                        </TableRow>
                    </CollapsibleContent>
                </>
              </Collapsible>
            ))}
          </TableBody>
        </Table>
        {filteredAndSortedRules.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">No rules match your filters.</div>
        )}
      </div>
    </div>
  );
}

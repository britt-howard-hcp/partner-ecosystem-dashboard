import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useChartData } from '../../hooks/useChartData';
import { useDetailPanel } from '../../hooks/useDetailPanel';
import { useDashboard } from '../../context/DashboardContext';

const SHORT_LABELS: Record<string, string> = {
  'Not Moving Forward': 'Not Moving Fwd',
  'Deactivated Partner': 'Deactivated',
  'Signed Agreements': 'Signed Agrmts',
  'Hidden Partner': 'Hidden',
};

export function StatusDistribution() {
  const { statusDistributionData } = useChartData();
  const { openList } = useDetailPanel();
  const { state } = useDashboard();

  // Only show stages that have data — saves vertical space
  const visibleData = useMemo(
    () => statusDistributionData.filter((d) => d.count > 0),
    [statusDistributionData],
  );

  const hasData = visibleData.length > 0;

  function handleClick(stage: string) {
    const partners = state.filteredPartners.filter((p) => p.airtableStatus === stage);
    openList(stage, partners);
  }

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
        Pipeline Stages
      </h3>
      <div className="bg-surface-800 rounded-lg p-4 border border-border flex-1 flex flex-col min-h-[160px]">
        {!hasData ? (
          <p className="text-sm text-text-muted italic flex items-center justify-center flex-1">
            No data for selected filters
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visibleData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis
                type="number"
                allowDecimals={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={{ stroke: '#2e3348' }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="stage"
                width={110}
                tick={{ fill: '#cbd5e1', fontSize: 10 }}
                axisLine={{ stroke: '#2e3348' }}
                tickLine={false}
                tickFormatter={(stage: string) => SHORT_LABELS[stage] ?? stage}
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{
                  backgroundColor: '#161822',
                  border: '1px solid #2e3348',
                  borderRadius: 8,
                  color: '#f1f5f9',
                  fontSize: 12,
                }}
                itemStyle={{ color: '#f1f5f9' }}
                labelStyle={{ color: '#cbd5e1' }}
                formatter={(value) => [value, 'Companies']}
                labelFormatter={(label) => label}
              />
              <Bar
                dataKey="count"
                name="Companies"
                radius={[0, 4, 4, 0]}
                className="cursor-pointer"
                onClick={(_data, index) => handleClick(visibleData[index].stage)}
              >
                {visibleData.map((entry) => (
                  <Cell key={entry.stage} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useChartData } from '../../hooks/useChartData';
import { useDetailPanel } from '../../hooks/useDetailPanel';
import { useDashboard } from '../../context/DashboardContext';

export function StatusDistribution() {
  const { statusDistributionData } = useChartData();
  const { openList } = useDetailPanel();
  const { state } = useDashboard();
  const hasData = statusDistributionData.some((d) => d.count > 0);

  function handleClick(stage: string) {
    const partners = state.filteredPartners.filter((p) => p.airtableStatus === stage);
    openList(stage, partners);
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
        Pipeline Stages
      </h3>
      <div className="bg-surface-800 rounded-lg p-4 border border-border h-full min-h-[160px]">
        {!hasData ? (
          <p className="text-sm text-text-muted italic flex items-center justify-center h-full">
            No data for selected filters
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={Math.max(160, statusDistributionData.length * 32 + 30)}>
            <BarChart data={statusDistributionData} layout="vertical" margin={{ left: 10, right: 20 }}>
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
                width={130}
                tick={{ fill: '#cbd5e1', fontSize: 11 }}
                axisLine={{ stroke: '#2e3348' }}
                tickLine={false}
              />
              <Tooltip
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
              />
              <Bar
                dataKey="count"
                name="Companies"
                radius={[0, 4, 4, 0]}
                className="cursor-pointer"
                onClick={(_data, index) => handleClick(statusDistributionData[index].stage)}
              >
                {statusDistributionData.map((entry) => (
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

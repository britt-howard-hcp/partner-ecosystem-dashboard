import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useChartData } from '../../hooks/useChartData';

export function StatusDistribution() {
  const { statusDistributionData } = useChartData();
  const hasData = statusDistributionData.some((d) => d.count > 0);

  return (
    <div>
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
        Pipeline Stages
      </h3>
      <div className="bg-surface-800 rounded-lg p-4 border border-border h-[320px]">
        {!hasData ? (
          <p className="text-sm text-text-muted italic flex items-center justify-center h-full">
            No data for selected filters
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusDistributionData} layout="vertical" margin={{ left: 30, right: 20 }}>
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
                tick={{ fill: '#94a3b8', fontSize: 11 }}
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
                formatter={(value) => [value, 'Companies']}
              />
              <Bar dataKey="count" name="Companies" radius={[0, 4, 4, 0]}>
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

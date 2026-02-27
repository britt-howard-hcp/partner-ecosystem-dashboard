import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useChartData } from '../../hooks/useChartData';

export function VolumeChart() {
  const { volumeData } = useChartData();

  return (
    <div>
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
        Request Volume
      </h3>
      <div className="bg-surface-800 rounded-lg p-4 border border-border h-[320px]">
        {volumeData.length === 0 ? (
          <p className="text-sm text-text-muted italic flex items-center justify-center h-full">
            No data for selected filters
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={volumeData}>
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e3348" />
              <XAxis
                dataKey="month"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={{ stroke: '#2e3348' }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
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
                itemStyle={{ color: '#f1f5f9' }}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#volumeGradient)"
                name="Companies"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

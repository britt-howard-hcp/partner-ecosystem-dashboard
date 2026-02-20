import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useChartData } from '../../hooks/useChartData';
import { useDetailPanel } from '../../hooks/useDetailPanel';
import { useDashboard } from '../../context/DashboardContext';
import type { Classification } from '../../types/partner';

export function CategoryBarChart() {
  const { classificationVolumeData } = useChartData();
  const { openClassification } = useDetailPanel();
  const { state } = useDashboard();

  function handleClick(classification: Classification) {
    const partners = state.filteredPartners.filter((p) => p.classification === classification);
    openClassification(classification, partners);
  }

  const hasData = classificationVolumeData.some((d) => d.count > 0);

  return (
    <div>
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
        By Classification
      </h3>
      <div className="bg-surface-800 rounded-lg p-4 border border-border h-[320px]">
        {!hasData ? (
          <p className="text-sm text-text-muted italic flex items-center justify-center h-full">
            No data for selected filters
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classificationVolumeData} layout="vertical" margin={{ left: 20, right: 20 }}>
              <XAxis
                type="number"
                allowDecimals={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={{ stroke: '#2e3348' }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="classification"
                width={110}
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
              />
              <Bar
                dataKey="count"
                name="Partners"
                radius={[0, 4, 4, 0]}
                className="cursor-pointer"
                onClick={(_data, index) => handleClick(classificationVolumeData[index].classification)}
              >
                {classificationVolumeData.map((entry) => (
                  <Cell key={entry.classification} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

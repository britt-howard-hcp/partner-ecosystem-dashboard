import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useChartData } from '../../hooks/useChartData';
import { useDetailPanel } from '../../hooks/useDetailPanel';
import { useDashboard } from '../../context/DashboardContext';
import type { Classification } from '../../types/partner';

export function CategoryBreakdown() {
  const { classificationData } = useChartData();
  const { openClassification } = useDetailPanel();
  const { state } = useDashboard();

  const hasData = classificationData.some((d) => d.value > 0);

  function handleClick(classification: Classification) {
    const partners = state.filteredPartners.filter((p) => p.classification === classification);
    openClassification(classification, partners);
  }

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
        Classifications
      </h3>
      <div className="bg-surface-800 rounded-lg p-4 border border-border flex-1 min-h-[160px]">
        {!hasData ? (
          <p className="text-sm text-text-muted italic flex items-center justify-center h-full">
            No data for selected filters
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={classificationData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                dataKey="value"
                nameKey="name"
                strokeWidth={0}
                className="cursor-pointer"
                onClick={(_, index) => handleClick(classificationData[index].name)}
              >
                {classificationData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
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
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => <span className="text-xs text-text-secondary">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useChartData } from '../../hooks/useChartData';
import { useDetailPanel } from '../../hooks/useDetailPanel';
import { useDashboard } from '../../context/DashboardContext';
import type { PartnerCategory } from '../../types/partner';

export function CategoryBreakdown() {
  const { categoryData } = useChartData();
  const { openCategory } = useDetailPanel();
  const { state } = useDashboard();

  const hasData = categoryData.some((d) => d.value > 0);

  function handleClick(category: PartnerCategory) {
    const partners = state.filteredPartners.filter((p) => p.category === category);
    openCategory(category, partners);
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
        Categories
      </h3>
      <div className="bg-surface-800 rounded-lg p-4 border border-border h-[320px]">
        {!hasData ? (
          <p className="text-sm text-text-muted italic flex items-center justify-center h-full">
            No data for selected filters
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                dataKey="value"
                nameKey="name"
                strokeWidth={0}
                className="cursor-pointer"
                onClick={(_, index) => handleClick(categoryData[index].name)}
              >
                {categoryData.map((entry) => (
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

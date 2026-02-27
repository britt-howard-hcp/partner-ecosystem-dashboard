import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useChartData } from '../../hooks/useChartData';
import { useDetailPanel } from '../../hooks/useDetailPanel';
import { useDashboard } from '../../context/DashboardContext';

const DEFAULT_VISIBLE = 15;
const BAR_COLOR = '#6366f1';

export function CategoryDistribution() {
  const { categoryDistributionData } = useChartData();
  const { openList } = useDetailPanel();
  const { state } = useDashboard();
  const [showAll, setShowAll] = useState(false);

  const hasData = categoryDistributionData.length > 0;
  const visibleData = showAll ? categoryDistributionData : categoryDistributionData.slice(0, DEFAULT_VISIBLE);
  const hasMore = categoryDistributionData.length > DEFAULT_VISIBLE;

  function handleClick(category: string) {
    const partners = state.filteredPartners.filter(
      (p) => (p.category || 'Uncategorized') === category,
    );
    openList(category, partners);
  }

  // Dynamic height: 28px per bar + 40px for axes/margins
  const chartHeight = Math.max(200, visibleData.length * 28 + 40);

  return (
    <div>
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
        Category Distribution
      </h3>
      <div className="bg-surface-800 rounded-lg p-4 border border-border">
        {!hasData ? (
          <p className="text-sm text-text-muted italic flex items-center justify-center h-[200px]">
            No data for selected filters
          </p>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart data={visibleData} layout="vertical" margin={{ left: 10, right: 20, top: 0, bottom: 0 }}>
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  axisLine={{ stroke: '#2e3348' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  width={140}
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
                  onClick={(_data, index) => handleClick(visibleData[index].category)}
                >
                  {visibleData.map((entry) => (
                    <Cell key={entry.category} fill={BAR_COLOR} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {hasMore && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-2 text-xs text-accent-400 hover:text-accent-300 transition-colors"
              >
                {showAll ? 'Show top 15' : `Show all ${categoryDistributionData.length} categories`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

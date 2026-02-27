import { CategoryDistribution } from './CategoryDistribution';
import { StatusDistribution } from './StatusDistribution';
import { CategoryBreakdown } from './CategoryBreakdown';

export function MarketPulse() {
  return (
    <section className="px-6 py-4">
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
        Market Pulse
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] lg:grid-rows-[1fr_1fr] gap-4" style={{ minHeight: 480 }}>
        {/* Primary chart: Category Distribution — spans both rows on left */}
        <div className="lg:row-span-2">
          <CategoryDistribution />
        </div>
        {/* Top right: Pipeline Stages */}
        <div className="h-full">
          <StatusDistribution />
        </div>
        {/* Bottom right: Classifications */}
        <div className="h-full">
          <CategoryBreakdown />
        </div>
      </div>
    </section>
  );
}

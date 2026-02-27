import { CategoryDistribution } from './CategoryDistribution';
import { StatusDistribution } from './StatusDistribution';
import { CategoryBreakdown } from './CategoryBreakdown';

export function MarketPulse() {
  return (
    <section className="px-6 py-4">
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
        Market Pulse
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Primary chart: Category Distribution — spans 2 columns */}
        <div className="lg:col-span-2">
          <CategoryDistribution />
        </div>
        {/* Right column: Status + Classification stacked */}
        <div className="flex flex-col gap-4">
          <StatusDistribution />
          <CategoryBreakdown />
        </div>
      </div>
    </section>
  );
}

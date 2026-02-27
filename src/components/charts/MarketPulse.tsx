import { VolumeChart } from './VolumeChart';
import { CategoryBreakdown } from './CategoryBreakdown';
import { StatusDistribution } from './StatusDistribution';

export function MarketPulse() {
  return (
    <section className="px-6 py-4">
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
        Market Pulse
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <VolumeChart />
        <CategoryBreakdown />
        <StatusDistribution />
      </div>
    </section>
  );
}

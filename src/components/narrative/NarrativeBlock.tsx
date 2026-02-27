import { useMemo } from 'react';
import { usePartners } from '../../hooks/usePartners';
import { useChartData } from '../../hooks/useChartData';

export function NarrativeBlock() {
  const { partners, liveCount, controlledCount, coreConflictCount } = usePartners();
  const { categoryDistributionData, statusDistributionData } = useChartData();

  const narrative = useMemo(() => {
    if (partners.length === 0) return 'No companies match the current filters.';

    const total = partners.length;
    const sentences: string[] = [];

    // Lead with top category — this is the "wow" for Roland
    const topCat = categoryDistributionData[0];
    if (topCat && topCat.count > 0 && topCat.category !== 'Uncategorized') {
      sentences.push(
        `${topCat.category} leads inbound interest with ${topCat.count} compan${topCat.count === 1 ? 'y' : 'ies'} tagged.`,
      );
    }

    // Selectivity rate
    if (liveCount > 0) {
      const selectivityRate = Math.round(((total - liveCount) / total) * 100);
      sentences.push(
        `HCP's ecosystem has processed ${total} requests with ${liveCount} live integration${liveCount === 1 ? '' : 's'} — a ${selectivityRate}% selectivity rate.`,
      );
    } else {
      sentences.push(`Viewing ${total} ecosystem request${total === 1 ? '' : 's'}.`);
    }

    // Pipeline stages breakdown
    const unexplored = statusDistributionData.find((d) => d.stage === 'Unexplored');
    const initialCall = statusDistributionData.find((d) => d.stage === 'Initial Call');
    const discovery = statusDistributionData.find((d) => d.stage === 'Discovery');
    const stageParts: string[] = [];
    if (unexplored && unexplored.count > 0) stageParts.push(`${unexplored.count} unexplored`);
    if (initialCall && initialCall.count > 0) stageParts.push(`${initialCall.count} at initial call`);
    if (discovery && discovery.count > 0) stageParts.push(`${discovery.count} in discovery`);
    if (stageParts.length > 0) {
      sentences.push(`Pipeline: ${stageParts.join(', ')}.`);
    }

    // Classification insight
    if (controlledCount > 0) {
      sentences.push(
        `${controlledCount} Controlled request${controlledCount === 1 ? '' : 's'} flagged — companies touching lead intake, communication, or job creation.`,
      );
    }
    if (coreConflictCount > 0) {
      sentences.push(
        `${coreConflictCount} Core Conflict request${coreConflictCount === 1 ? '' : 's'} identified for competitive overlap.`,
      );
    }

    return sentences.join(' ');
  }, [partners, liveCount, controlledCount, coreConflictCount, categoryDistributionData, statusDistributionData]);

  return (
    <section className="px-6 py-3">
      <div className="bg-surface-800 rounded-lg p-4 border border-border">
        <p className="text-sm text-text-secondary leading-relaxed">{narrative}</p>
      </div>
    </section>
  );
}

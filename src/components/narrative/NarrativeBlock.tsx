import { useMemo } from 'react';
import { usePartners } from '../../hooks/usePartners';
import { useChartData } from '../../hooks/useChartData';

export function NarrativeBlock() {
  const { partners, partnersByStatus, coreConflictCount, mutualHcpCustomers } = usePartners();
  const { classificationVolumeData } = useChartData();

  const narrative = useMemo(() => {
    if (partners.length === 0) return 'No companies match the current filters.';

    const total = partners.length;
    const active = partnersByStatus.Active.length;
    const evaluating = partnersByStatus.Evaluating.length;
    const declined = partnersByStatus.Declined.length;
    const onboarding = partnersByStatus.Onboarding.length;

    const sentences: string[] = [];

    // Opening — reference HCP, frame selectivity positively
    if (total > 0 && active > 0) {
      const selectivityRate = Math.round(((total - active) / total) * 100);
      sentences.push(
        `HCP's integration ecosystem has processed ${total} ecosystem requests, maintaining a ${selectivityRate}% selectivity rate with ${active} live integration${active === 1 ? '' : 's'}.`,
      );
    } else {
      sentences.push(`Viewing ${total} ecosystem request${total === 1 ? '' : 's'} in HCP's ecosystem.`);
    }

    // Pipeline activity
    const pipelineParts: string[] = [];
    if (evaluating > 0) pipelineParts.push(`${evaluating} in evaluation`);
    if (onboarding > 0) pipelineParts.push(`${onboarding} onboarding`);
    if (pipelineParts.length > 0) {
      sentences.push(`Current pipeline: ${pipelineParts.join(', ')}.`);
    }

    // Classification insight
    if (coreConflictCount > 0) {
      sentences.push(
        `${coreConflictCount} Core Conflict request${coreConflictCount === 1 ? '' : 's'} identified — ${
          coreConflictCount === declined
            ? 'all appropriately declined.'
            : 'flagged for competitive overlap with HCP\'s core product.'
        }`,
      );
    }

    // Top classification
    const topCls = classificationVolumeData[0];
    if (topCls && topCls.count > 0) {
      sentences.push(
        `${topCls.classification} leads classification volume with ${topCls.count} compan${topCls.count === 1 ? 'y' : 'ies'}.`,
      );
    }

    // Mutual customers
    if (mutualHcpCustomers > 0) {
      sentences.push(
        `Active integrations serve ${mutualHcpCustomers.toLocaleString()} mutual HCP customers.`,
      );
    }

    return sentences.join(' ');
  }, [partners, partnersByStatus, coreConflictCount, mutualHcpCustomers, classificationVolumeData]);

  return (
    <section className="px-6 py-3">
      <div className="bg-surface-800 rounded-lg p-4 border border-border">
        <p className="text-sm text-text-secondary leading-relaxed">{narrative}</p>
      </div>
    </section>
  );
}

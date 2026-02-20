import { useMemo } from 'react';
import { usePartners } from '../../hooks/usePartners';
import { useChartData } from '../../hooks/useChartData';

export function NarrativeBlock() {
  const { partners, partnersByStage } = usePartners();
  const { categoryVolumeData } = useChartData();

  const narrative = useMemo(() => {
    if (partners.length === 0) return 'No partners match the current filters.';

    const total = partners.length;
    const active = partnersByStage.Active.length;
    const evaluating = partnersByStage.Evaluating.length;
    const declined = partnersByStage.Declined.length;

    const topCategory = categoryVolumeData[0];

    const sentences: string[] = [];

    sentences.push(
      `Viewing ${total} partner${total === 1 ? '' : 's'} across the ecosystem.`,
    );

    if (active > 0 || evaluating > 0) {
      const parts: string[] = [];
      if (active > 0) parts.push(`${active} active`);
      if (evaluating > 0) parts.push(`${evaluating} in evaluation`);
      sentences.push(`Currently ${parts.join(' and ')}.`);
    }

    if (topCategory && topCategory.count > 0) {
      sentences.push(
        `${topCategory.category} leads with ${topCategory.count} partner${topCategory.count === 1 ? '' : 's'}.`,
      );
    }

    if (declined > 0) {
      const declineRate = Math.round((declined / total) * 100);
      sentences.push(`${declineRate}% of partners have been declined.`);
    }

    return sentences.join(' ');
  }, [partners, partnersByStage, categoryVolumeData]);

  return (
    <section className="px-6 py-3">
      <div className="bg-surface-800 rounded-lg p-4 border border-border">
        <p className="text-sm text-text-secondary leading-relaxed">{narrative}</p>
      </div>
    </section>
  );
}

import type { PartnerCategory, PipelineStage } from '../../types/partner';

const categoryColors: Record<PartnerCategory, string> = {
  'AI & Automation Tools': 'bg-cat-ai/20 text-cat-ai',
  'Customer Communication Tools': 'bg-cat-comm/20 text-cat-comm',
  'Marketing Platforms': 'bg-cat-marketing/20 text-cat-marketing',
  'Scheduling & Dispatch Tools': 'bg-cat-scheduling/20 text-cat-scheduling',
  'Other Trade-Specific Platforms': 'bg-cat-other/20 text-cat-other',
};

const stageColors: Record<PipelineStage, string> = {
  Evaluating: 'bg-stage-evaluating/20 text-stage-evaluating',
  Onboarding: 'bg-stage-onboarding/20 text-stage-onboarding',
  Active: 'bg-stage-active/20 text-stage-active',
  Declined: 'bg-stage-declined/20 text-stage-declined',
};

interface BadgeProps {
  label: string;
  variant: 'category' | 'stage';
}

export function Badge({ label, variant }: BadgeProps) {
  const colorClass =
    variant === 'category'
      ? categoryColors[label as PartnerCategory]
      : stageColors[label as PipelineStage];

  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass ?? ''}`}>
      {label}
    </span>
  );
}

import type { Classification, Status, PartnershipType } from '../../types/partner';

const classificationColors: Record<Classification, string> = {
  'Core Conflict': 'bg-cls-core-conflict/20 text-cls-core-conflict',
  'Controlled': 'bg-cls-controlled/20 text-cls-controlled',
  'Open': 'bg-cls-open/20 text-cls-open',
};

const statusColors: Record<Status, string> = {
  Evaluating: 'bg-stage-evaluating/20 text-stage-evaluating',
  Onboarding: 'bg-stage-onboarding/20 text-stage-onboarding',
  Active: 'bg-stage-active/20 text-stage-active',
  Declined: 'bg-stage-declined/20 text-stage-declined',
};

const partnershipColors: Record<PartnershipType, string> = {
  'Product Partnership': 'bg-partnership-product/20 text-partnership-product',
  'Ecosystem Partnership': 'bg-surface-600 text-text-secondary',
};

interface BadgeProps {
  label: string;
  variant: 'classification' | 'status' | 'partnership';
}

export function Badge({ label, variant }: BadgeProps) {
  let colorClass = '';
  if (variant === 'classification') {
    colorClass = classificationColors[label as Classification] ?? '';
  } else if (variant === 'status') {
    colorClass = statusColors[label as Status] ?? '';
  } else if (variant === 'partnership') {
    colorClass = partnershipColors[label as PartnershipType] ?? '';
  }

  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
}

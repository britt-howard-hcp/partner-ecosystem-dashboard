interface EnrichedBadgeProps {
  field: string;
  enrichedFields: string[];
}

export function EnrichedBadge({ field, enrichedFields }: EnrichedBadgeProps) {
  if (!enrichedFields.includes(field)) return null;

  return (
    <span
      className="inline-flex items-center ml-1 text-accent-400/70 cursor-help"
      title="AI-estimated based on company profile"
    >
      <span className="text-xs" aria-hidden="true">✨</span>
    </span>
  );
}

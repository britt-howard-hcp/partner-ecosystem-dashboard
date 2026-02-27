interface EnrichedBadgeProps {
  field: string;
  enrichedFields: string[];
}

export function EnrichedBadge({ field, enrichedFields }: EnrichedBadgeProps) {
  if (!enrichedFields.includes(field)) return null;

  return (
    <span
      className="inline-flex items-center ml-1 text-accent-400/60"
      title="Enriched from classification overrides — not yet in Airtable"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M8 0l2 5.5L16 6l-4.5 3.5L13 16l-5-3.5L3 16l1.5-6.5L0 6l6-.5z" />
      </svg>
    </span>
  );
}

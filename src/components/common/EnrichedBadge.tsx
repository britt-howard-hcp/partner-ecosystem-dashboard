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
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 0L13.5 8.5L20 5L15.5 10.5L24 12L15.5 13.5L20 19L13.5 15.5L12 24L10.5 15.5L4 19L8.5 13.5L0 12L8.5 10.5L4 5L10.5 8.5Z" />
      </svg>
    </span>
  );
}

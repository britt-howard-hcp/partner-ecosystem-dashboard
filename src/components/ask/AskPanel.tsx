interface AskPanelProps {
  onClose: () => void;
}

const EXAMPLE_QUERIES = [
  'How many AI companies are in the pipeline?',
  'Which categories have the most Controlled requests?',
  'Show me companies with 1000+ mutual customers',
];

export function AskPanel({ onClose }: AskPanelProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[420px] bg-surface-900 border-l border-border z-50 animate-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-400">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26z" />
            </svg>
            <h2 className="text-base font-semibold text-text-primary">Ask the Ecosystem</h2>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors text-lg leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Placeholder Body */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-accent-500/10 flex items-center justify-center mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-400">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            AI-Powered Ecosystem Intelligence
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">
            Ask natural language questions about HCP's partner ecosystem. Claude will analyze the full dataset and return insights.
          </p>
          <p className="text-xs text-accent-400 font-medium mb-6">
            Claude API integration coming in Phase 3
          </p>

          {/* Example queries */}
          <div className="w-full space-y-2">
            <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Example queries</p>
            {EXAMPLE_QUERIES.map((q) => (
              <div
                key={q}
                className="text-left text-sm text-text-muted bg-surface-800 rounded-lg px-4 py-2.5 border border-border"
              >
                "{q}"
              </div>
            ))}
          </div>
        </div>

        {/* Disabled Input */}
        <div className="px-4 py-4 border-t border-border">
          <div className="flex items-center gap-2 bg-surface-800 rounded-lg border border-border px-4 py-3 opacity-50">
            <input
              type="text"
              disabled
              placeholder="Ask about the ecosystem..."
              className="flex-1 bg-transparent text-sm text-text-secondary placeholder-text-muted outline-none cursor-not-allowed"
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

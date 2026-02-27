interface AskFabProps {
  onClick: () => void;
}

export function AskFab({ onClick }: AskFabProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-accent-500 hover:bg-accent-400 text-white shadow-lg shadow-accent-500/25 transition-colors flex items-center justify-center animate-fab-pulse"
      aria-label="Ask the Ecosystem"
      title="Ask the Ecosystem"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26z" />
      </svg>
    </button>
  );
}

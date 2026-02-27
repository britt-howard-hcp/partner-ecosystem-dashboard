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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L13.5 8.5L20 5L15.5 10.5L24 12L15.5 13.5L20 19L13.5 15.5L12 24L10.5 15.5L4 19L8.5 13.5L0 12L8.5 10.5L4 5L10.5 8.5Z" />
      </svg>
    </button>
  );
}

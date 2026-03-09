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
      <span className="text-2xl leading-none">✨</span>
    </button>
  );
}

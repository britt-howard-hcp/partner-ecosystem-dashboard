import { useState, type FormEvent } from 'react';

interface Props {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t border-border">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. How many AI tools came through this quarter?"
        disabled={disabled}
        className="flex-1 bg-surface-700 border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="bg-accent-500 hover:bg-accent-400 disabled:opacity-40 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
      >
        Send
      </button>
    </form>
  );
}

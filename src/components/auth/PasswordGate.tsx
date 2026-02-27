import { useState, type ReactNode } from 'react';

const STORAGE_KEY = 'hcp-dashboard-auth';

export function PasswordGate({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === 'true',
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === import.meta.env.VITE_SITE_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setAuthenticated(true);
    } else {
      setError(true);
    }
  }

  if (authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-900 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h1 className="text-xl font-semibold text-text-primary text-center mb-1">
          Partner Ecosystem Dashboard
        </h1>
        <p className="text-sm text-text-muted text-center mb-8">
          Enter password to continue
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          placeholder="Password"
          autoFocus
          className="w-full bg-surface-800 border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-500 transition-colors"
        />
        {error && (
          <p className="text-xs text-cls-core-conflict mt-2">
            Incorrect password. Please try again.
          </p>
        )}
        <button
          type="submit"
          className="w-full mt-4 bg-accent-500 hover:bg-accent-400 text-white font-medium rounded-lg px-4 py-3 text-sm transition-colors"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

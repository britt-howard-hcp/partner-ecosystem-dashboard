import type { ReactNode } from 'react';

export function Sidebar({ children }: { children: ReactNode }) {
  return (
    <aside className="w-[380px] border-l border-border bg-surface-800 flex flex-col">
      {children}
    </aside>
  );
}

import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function DashboardShell({ children }: Props) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-900">
      <div className="flex-1 flex flex-col overflow-y-auto">{children}</div>
    </div>
  );
}

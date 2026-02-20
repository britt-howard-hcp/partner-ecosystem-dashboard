import type { ReactNode } from 'react';

interface Props {
  main: ReactNode;
  sidebar: ReactNode;
}

export function DashboardShell({ main, sidebar }: Props) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-900">
      <div className="flex-1 flex flex-col overflow-y-auto">{main}</div>
      {sidebar}
    </div>
  );
}

import { useState } from 'react';
import { PasswordGate } from './components/auth/PasswordGate';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { ChatProvider } from './context/ChatContext';
import { DashboardShell } from './components/layout/DashboardShell';
import { Header } from './components/layout/Header';
import { FilterBar } from './components/filters/FilterBar';
import { MarketPulse } from './components/charts/MarketPulse';
import { NarrativeBlock } from './components/narrative/NarrativeBlock';
import { PartnerTable } from './components/table/PartnerTable';
import { DetailPanel } from './components/detail/DetailPanel';
import { AskFab } from './components/ask/AskFab';
import { AskPanel } from './components/ask/AskPanel';

function AskTheEcosystem() {
  const [askOpen, setAskOpen] = useState(false);
  const { state } = useDashboard();

  return (
    <ChatProvider partners={state.allPartners}>
      {!askOpen && <AskFab onClick={() => setAskOpen(true)} />}
      {askOpen && <AskPanel onClose={() => setAskOpen(false)} />}
    </ChatProvider>
  );
}

export default function App() {
  return (
    <PasswordGate>
      <DashboardProvider>
        <DashboardShell>
          <Header />
          <FilterBar />
          <MarketPulse />
          <NarrativeBlock />
          <PartnerTable />
        </DashboardShell>
        <DetailPanel />
        <AskTheEcosystem />
      </DashboardProvider>
    </PasswordGate>
  );
}

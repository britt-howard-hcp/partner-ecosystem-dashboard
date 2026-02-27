import { useState } from 'react';
import { DashboardProvider } from './context/DashboardContext';
import { DashboardShell } from './components/layout/DashboardShell';
import { Header } from './components/layout/Header';
import { FilterBar } from './components/filters/FilterBar';
import { MarketPulse } from './components/charts/MarketPulse';
import { NarrativeBlock } from './components/narrative/NarrativeBlock';
import { PartnerTable } from './components/table/PartnerTable';
import { DetailPanel } from './components/detail/DetailPanel';
import { AskFab } from './components/ask/AskFab';
import { AskPanel } from './components/ask/AskPanel';

export default function App() {
  const [askOpen, setAskOpen] = useState(false);

  return (
    <DashboardProvider>
      <DashboardShell>
        <Header />
        <FilterBar />
        <MarketPulse />
        <NarrativeBlock />
        <PartnerTable />
      </DashboardShell>
      <DetailPanel />
      {!askOpen && <AskFab onClick={() => setAskOpen(true)} />}
      {askOpen && <AskPanel onClose={() => setAskOpen(false)} />}
    </DashboardProvider>
  );
}

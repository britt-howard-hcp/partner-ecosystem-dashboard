import { DashboardProvider } from './context/DashboardContext';
import { DashboardShell } from './components/layout/DashboardShell';
import { Header } from './components/layout/Header';
import { FilterBar } from './components/filters/FilterBar';
import { MarketPulse } from './components/charts/MarketPulse';
import { NarrativeBlock } from './components/narrative/NarrativeBlock';
import { PartnerTable } from './components/table/PartnerTable';
import { DetailPanel } from './components/detail/DetailPanel';

export default function App() {
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
    </DashboardProvider>
  );
}

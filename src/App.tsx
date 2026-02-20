import { DashboardProvider } from './context/DashboardContext';
import { ChatProvider } from './context/ChatContext';
import { DashboardShell } from './components/layout/DashboardShell';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { FilterBar } from './components/filters/FilterBar';
import { MarketPulse } from './components/charts/MarketPulse';
import { NarrativeBlock } from './components/narrative/NarrativeBlock';
import { PipelineBoard } from './components/pipeline/PipelineBoard';
import { ChatPanel } from './components/chat/ChatPanel';
import { DetailPanel } from './components/detail/DetailPanel';

export default function App() {
  return (
    <DashboardProvider>
      <ChatProvider>
        <DashboardShell
          main={
            <>
              <Header />
              <FilterBar />
              <MarketPulse />
              <NarrativeBlock />
              <PipelineBoard />
            </>
          }
          sidebar={
            <Sidebar>
              <ChatPanel />
            </Sidebar>
          }
        />
        <DetailPanel />
      </ChatProvider>
    </DashboardProvider>
  );
}

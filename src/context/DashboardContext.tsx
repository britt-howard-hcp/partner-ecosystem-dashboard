import { createContext, useContext, useReducer, useEffect, useState, type ReactNode } from 'react';
import type { Partner } from '../types/partner';
import type { FilterState } from '../types/filters';
import type { DetailPanelView } from '../types/detail-panel';
import { partnerService } from '../services';

const pipelineStages = new Set([
  'Unexplored',
  'Initial Call',
  'Discovery',
  'Pilot',
  'Signed Agreements',
]);

interface DashboardState {
  allPartners: Partner[];
  filteredPartners: Partner[];
  filters: FilterState;
  loading: boolean;
  detailPanel: DetailPanelView;
}

type Action =
  | { type: 'SET_PARTNERS'; partners: Partner[] }
  | { type: 'SET_FILTER'; filters: Partial<FilterState> }
  | { type: 'OPEN_DETAIL_PANEL'; view: NonNullable<DetailPanelView> }
  | { type: 'CLOSE_DETAIL_PANEL' };

const defaultFilters: FilterState = {
  dateStart: '',
  dateEnd: '',
  classification: 'All',
  integrationType: 'All',
  searchQuery: '',
  airtableStatus: 'All',
  category: 'All',
};

function applyFilters(partners: Partner[], filters: FilterState): Partner[] {
  return partners.filter((p) => {
    if (filters.dateStart && p.requestDate && p.requestDate < filters.dateStart) return false;
    if (filters.dateEnd && p.requestDate && p.requestDate > filters.dateEnd) return false;
    if (filters.classification !== 'All' && p.classification !== filters.classification) return false;
    if (filters.integrationType !== 'All' && p.integrationType !== filters.integrationType) return false;
    if (filters.airtableStatus === '__pipeline__') {
      if (!pipelineStages.has(p.airtableStatus)) return false;
    } else if (filters.airtableStatus !== 'All') {
      if (p.airtableStatus !== filters.airtableStatus) return false;
    }
    if (filters.category !== 'All') {
      if ((p.category ?? 'Uncategorized') !== filters.category) return false;
    }
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      if (!p.name.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

function reducer(state: DashboardState, action: Action): DashboardState {
  switch (action.type) {
    case 'SET_PARTNERS':
      return {
        ...state,
        allPartners: action.partners,
        filteredPartners: applyFilters(action.partners, state.filters),
        loading: false,
      };
    case 'SET_FILTER': {
      const filters = { ...state.filters, ...action.filters };
      return {
        ...state,
        filters,
        filteredPartners: applyFilters(state.allPartners, filters),
      };
    }
    case 'OPEN_DETAIL_PANEL':
      return { ...state, detailPanel: action.view };
    case 'CLOSE_DETAIL_PANEL':
      return { ...state, detailPanel: null };
  }
}

const initialState: DashboardState = {
  allPartners: [],
  filteredPartners: [],
  filters: defaultFilters,
  loading: true,
  detailPanel: null,
};

interface DashboardContextValue {
  state: DashboardState;
  dispatch: React.Dispatch<Action>;
}

const DashboardCtx = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;
    setInitialized(true);
    partnerService.getAll().then((partners) => {
      dispatch({ type: 'SET_PARTNERS', partners });
    });
  }, [initialized]);

  return <DashboardCtx.Provider value={{ state, dispatch }}>{children}</DashboardCtx.Provider>;
}

export function useDashboard() {
  const ctx = useContext(DashboardCtx);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
}

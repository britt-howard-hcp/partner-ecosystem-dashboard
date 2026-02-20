import { useState, useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';

export function useSearch() {
  const { state } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return state.allPartners
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [searchQuery, state.allPartners]);

  return { searchQuery, setSearchQuery, searchResults };
}

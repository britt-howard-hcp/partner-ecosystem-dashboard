import { useState, useRef, useEffect } from 'react';
import { useSearch } from '../../hooks/useSearch';
import { useDetailPanel } from '../../hooks/useDetailPanel';
import type { Partner } from '../../types/partner';

export function SearchBar() {
  const { searchQuery, setSearchQuery, searchResults } = useSearch();
  const { openPartner } = useDetailPanel();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(partner: Partner) {
    openPartner(partner);
    setSearchQuery('');
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex items-center gap-2">
        <label className="text-xs text-text-muted">Search</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Partner name..."
          className="bg-surface-700 border border-border rounded px-2 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500 w-48"
        />
      </div>
      {open && searchResults.length > 0 && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-surface-800 border border-border rounded-lg shadow-xl z-50 overflow-hidden">
          {searchResults.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className="w-full text-left px-3 py-2 hover:bg-surface-700 transition-colors"
            >
              <p className="text-sm text-text-primary truncate">{p.name}</p>
              <p className="text-xs text-text-muted">{p.category} &middot; {p.stage}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import { SearchBar } from './SearchBar';
import { DateRangePicker } from './DateRangePicker';
import { CategoryDropdown } from './CategoryDropdown';
import { IntegrationTypeDropdown } from './IntegrationTypeDropdown';

export function FilterBar() {
  return (
    <div className="flex items-center gap-6 px-6 py-3 border-b border-border flex-wrap">
      <SearchBar />
      <DateRangePicker />
      <CategoryDropdown />
      <IntegrationTypeDropdown />
    </div>
  );
}

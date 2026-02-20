import { SearchBar } from './SearchBar';
import { DateRangePicker } from './DateRangePicker';
import { ClassificationDropdown } from './ClassificationDropdown';
import { IntegrationTypeDropdown } from './IntegrationTypeDropdown';

export function FilterBar() {
  return (
    <div className="flex items-center gap-6 px-6 py-3 border-b border-border flex-wrap">
      <SearchBar />
      <DateRangePicker />
      <ClassificationDropdown />
      <IntegrationTypeDropdown />
    </div>
  );
}

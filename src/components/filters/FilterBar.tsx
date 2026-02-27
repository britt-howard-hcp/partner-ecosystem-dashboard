import { SearchBar } from './SearchBar';
import { DateRangePicker } from './DateRangePicker';
import { StatusDropdown } from './StatusDropdown';
import { CategoryDropdown } from './CategoryDropdown';
import { ClassificationDropdown } from './ClassificationDropdown';
import { IntegrationTypeDropdown } from './IntegrationTypeDropdown';

export function FilterBar() {
  return (
    <div className="flex items-center gap-6 px-6 py-3 border-b border-border flex-wrap">
      <SearchBar />
      <StatusDropdown />
      <CategoryDropdown />
      <ClassificationDropdown />
      <IntegrationTypeDropdown />
      <DateRangePicker />
    </div>
  );
}

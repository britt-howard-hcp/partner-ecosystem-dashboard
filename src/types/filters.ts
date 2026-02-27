import type { Classification, IntegrationType } from './partner';

export interface FilterState {
  dateStart: string;
  dateEnd: string;
  classification: Classification | 'All';
  integrationType: IntegrationType | 'All';
  searchQuery: string;
  airtableStatus: string; // 'All', specific stage name, or '__pipeline__' for the 5 active stages
  category: string; // 'All' or specific category name
}

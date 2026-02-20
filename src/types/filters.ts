import type { Classification, IntegrationType } from './partner';

export interface FilterState {
  dateStart: string;
  dateEnd: string;
  classification: Classification | 'All';
  integrationType: IntegrationType | 'All';
  searchQuery: string;
}

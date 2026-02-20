import type { PartnerCategory, IntegrationType } from './partner';

export interface FilterState {
  dateStart: string;
  dateEnd: string;
  category: PartnerCategory | 'All';
  integrationType: IntegrationType | 'All';
  searchQuery: string;
}

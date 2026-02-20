import type { Partner } from '../types/partner';
import { fakePartners } from '../data/fake-partners';

export interface PartnerService {
  getAll(): Promise<Partner[]>;
}

// --- Fake implementation (swap this export for Airtable later) ---

const fakePartnerService: PartnerService = {
  async getAll() {
    return fakePartners;
  },
};

// SWAP POINT: change to `airtablePartnerService` when ready
export const partnerService: PartnerService = fakePartnerService;

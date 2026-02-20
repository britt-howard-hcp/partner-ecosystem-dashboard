import type { Partner } from '../types/partner';
import { partners } from '../data/partners';

export interface PartnerService {
  getAll(): Promise<Partner[]>;
}

// --- Fake implementation (swap this export for Airtable later) ---

const fakePartnerService: PartnerService = {
  async getAll() {
    return partners;
  },
};

// SWAP POINT: change to `airtablePartnerService` when ready
export const partnerService: PartnerService = fakePartnerService;

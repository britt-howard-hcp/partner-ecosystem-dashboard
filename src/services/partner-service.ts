import type { Partner } from '../types/partner';
import { airtablePartnerService } from './airtable-partner-service';

export interface PartnerService {
  getAll(): Promise<Partner[]>;
}

// SWAP: using Airtable implementation (falls back to fake data if API unavailable)
export const partnerService: PartnerService = airtablePartnerService;

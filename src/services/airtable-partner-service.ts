import type { Partner, Status } from '../types/partner';
import type { PartnerService } from './partner-service';
import { getOverride, mapStatus } from '../data/classification-overrides';
import { partners as fakePartners } from '../data/partners';

interface AirtableRecord {
  id: string;
  createdTime?: string;
  fields: Record<string, unknown>;
}

/** Convert a value to a trimmed string, joining arrays. */
function str(value: unknown): string {
  if (value == null) return '';
  if (Array.isArray(value)) return value.join(', ');
  return String(value).trim();
}

/** Convert a value to string or undefined (for optional fields). */
function strOrUndef(value: unknown): string | undefined {
  const s = str(value);
  return s || undefined;
}

/** Extract a number from a value. Returns 0 if unparseable. */
function parseNum(value: unknown): number {
  if (value == null) return 0;
  const n = Number(value);
  return isNaN(n) ? 0 : Math.round(n);
}

/**
 * Parse the "Mutual Pros" field which mixes numbers and prose text.
 * Examples: "200", "3,497", "~25,000 active contractors", "They have about 80 mutual customers"
 * Extracts the first number found.
 */
function parseMutualPros(value: unknown): number | undefined {
  if (value == null) return undefined;
  const s = String(value).replace(/,/g, '');
  const match = s.match(/(\d+)/);
  if (!match) return undefined;
  const n = parseInt(match[1], 10);
  return n > 0 ? n : undefined;
}

function mapRecord(record: AirtableRecord): Partner {
  const f = record.fields;
  const name = str(f['App']);
  const override = getOverride(name);
  const dashboardStatus = mapStatus(str(f['Status'])) as Status;

  return {
    id: record.id,
    name,
    website: strOrUndef(f['Website']),
    description: strOrUndef(f['Description']) || strOrUndef(f['Recommendation']),
    classification: override.classification,
    partnershipType: override.partnershipType,
    status: dashboardStatus,
    integrationType: override.integrationType,
    requestDate: strOrUndef(f['Added']) || record.createdTime?.slice(0, 10) || undefined,
    customerCount: parseNum(f['Customers']) || parseNum(f['# Pros']) || undefined,
    integrationRequest: strOrUndef(f['Proposed Integration']),
    whyIntegrate: strOrUndef(f['Recommendation']),
    mutualCustomers: parseMutualPros(f['Mutual Pros']),
    contactName: strOrUndef(f['Name (from Contacts)']),
    contactEmail: strOrUndef(f['Email (from Contacts)']),
    notes: strOrUndef(f['Notes URL']),
  };
}

export const airtablePartnerService: PartnerService = {
  async getAll(): Promise<Partner[]> {
    try {
      const res = await fetch('/api/partners');
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const records: AirtableRecord[] = await res.json();
      return records.map(mapRecord);
    } catch (err) {
      console.warn('Airtable fetch failed, falling back to fake data:', err);
      return fakePartners;
    }
  },
};

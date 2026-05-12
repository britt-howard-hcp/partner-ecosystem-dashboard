import type {
  Classification,
  IntegrationType,
  Partner,
  PartnershipType,
  Status,
} from '../types/partner';
import type { PartnerService } from './partner-service';
import { getOverride, mapStatus } from '../data/classification-overrides';
import { partners as fakePartners } from '../data/partners';

const VALID_CLASSIFICATIONS: Classification[] = ['Core Conflict', 'Controlled', 'Open'];
const VALID_INTEGRATION_TYPES: IntegrationType[] = [
  'API',
  'Webhook',
  'OAuth',
  'Embedded',
  'Data Sync',
  'White Label',
];
const VALID_PARTNERSHIP_TYPES: PartnershipType[] = [
  'Product Partnership',
  'Ecosystem Partnership',
];

function pickClassification(raw: string): Classification | undefined {
  return VALID_CLASSIFICATIONS.find((c) => c === raw);
}

function pickIntegrationType(raw: string): IntegrationType | undefined {
  return VALID_INTEGRATION_TYPES.find((c) => c === raw);
}

function pickPartnershipType(raw: string): PartnershipType | undefined {
  return VALID_PARTNERSHIP_TYPES.find((c) => c === raw);
}

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

/** Normalize known typos and case inconsistencies in category values. */
function normalizeCategory(raw: string): string {
  if (raw.toLowerCase() === 'insurane') return 'Insurance';
  return raw;
}

/** Normalize known case inconsistencies in status values. */
function normalizeStatus(raw: string): string {
  if (raw === 'Not Moving forward') return 'Not Moving Forward';
  return raw;
}

function mapRecord(record: AirtableRecord): Partner {
  const f = record.fields;
  const name = str(f['App']);
  const override = getOverride(name);

  const rawStatus = normalizeStatus(str(f['Status']));
  const dashboardStatus = mapStatus(rawStatus) as Status;

  // Category: Airtable multi-select returns an array. Override fallback is a single string wrapped in [].
  const rawCategory = f['Category'];
  let category: string[];
  const enrichedFields: string[] = [];

  if (Array.isArray(rawCategory) && rawCategory.length > 0) {
    category = rawCategory.map((tag: unknown) => normalizeCategory(String(tag).trim())).filter(Boolean);
  } else if (typeof rawCategory === 'string' && rawCategory.trim()) {
    category = [normalizeCategory(rawCategory.trim())];
  } else if (override.category) {
    category = [override.category];
    enrichedFields.push('category');
  } else {
    category = ['Uncategorized'];
  }

  // Prefer Airtable values for the classification trio (Ecosystem 2.0 Phase 1
  // migration 0002 populated these for 67 partners). Fall back to the override
  // file for partners not yet covered by the migration.
  const airtableClassification = pickClassification(str(f['Classification']));
  const classification: Classification = airtableClassification ?? override.classification;
  if (!airtableClassification) enrichedFields.push('classification');

  const airtableIntegrationType = pickIntegrationType(str(f['Integration Type']));
  const integrationType: IntegrationType = airtableIntegrationType ?? override.integrationType;
  if (!airtableIntegrationType) enrichedFields.push('integrationType');

  const airtablePartnershipType = pickPartnershipType(str(f['Partnership Type']));
  const partnershipType: PartnershipType =
    airtablePartnershipType ?? override.partnershipType;
  if (!airtablePartnershipType) enrichedFields.push('partnershipType');

  const rawWorkstreams = f['Active Workstreams'];
  const activeWorkstreams = Array.isArray(rawWorkstreams)
    ? rawWorkstreams.map((w: unknown) => String(w).trim()).filter(Boolean)
    : undefined;

  const strategicTierRaw = f['Strategic Tier'];
  const strategicTier =
    strategicTierRaw != null && strategicTierRaw !== ''
      ? parseNum(strategicTierRaw)
      : undefined;

  return {
    id: record.id,
    name,
    website: strOrUndef(f['Website']),
    description: strOrUndef(f['Description']) || strOrUndef(f['Recommendation']),
    classification,
    partnershipType,
    status: dashboardStatus,
    integrationType,
    requestDate: strOrUndef(f['Added']) || record.createdTime?.slice(0, 10) || undefined,
    customerCount: parseNum(f['Customers']) || parseNum(f['# Pros']) || undefined,
    integrationRequest: strOrUndef(f['Proposed Integration']),
    whyIntegrate: strOrUndef(f['Recommendation']),
    mutualCustomers: parseMutualPros(f['Mutual Pros']),
    contactName: strOrUndef(f['Name (from Contacts)']) || strOrUndef(f['Contact Name']),
    contactEmail: strOrUndef(f['Email (from Contacts)']) || strOrUndef(f['Contact Email']),
    notes: strOrUndef(f['Notes URL']),
    category,
    airtableStatus: rawStatus,
    enrichedFields,
    owner: strOrUndef(f['Owner']),
    slug: strOrUndef(f['Slug']),
    lastTouch: strOrUndef(f['Last Touch']),
    strategicTier: strategicTier && strategicTier > 0 ? strategicTier : undefined,
    activeWorkstreams: activeWorkstreams && activeWorkstreams.length > 0 ? activeWorkstreams : undefined,
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

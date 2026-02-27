/**
 * Classification Overrides — Placeholder classifications for real Airtable partners.
 *
 * These are NOT official. The two-tier model (Product vs Ecosystem) is approved,
 * but the three-category classification (Core Conflict / Controlled / Open) is still
 * pending leadership approval. These placeholders exist so the dashboard can render
 * meaningful badges and charts while the framework is being finalized.
 *
 * Source: Britt Bot knowledge base cross-referenced with Airtable export (67 records with status).
 *
 * Classification logic (from draft framework):
 * - Core Conflict: System of record for scheduling, invoicing, or payments
 * - Controlled: Touches lead intake, customer communication, or job creation
 *   (voice/telephony, CSR AI, lead routing, answering services, booking tools)
 * - Open: Enhances workflows but doesn't control core data/revenue
 *   (marketing, reviews, GPS, field tools, payroll, financing, inventory, trade tools)
 *
 * To update: edit the entries below. When classifications move to Airtable as an
 * official field, delete this file and read directly from the API response.
 */

export type Classification = 'Core Conflict' | 'Controlled' | 'Open';
export type IntegrationType = 'API' | 'Webhook' | 'OAuth' | 'Embedded' | 'Data Sync' | 'White Label';
export type PartnershipType = 'Product Partnership' | 'Ecosystem Partnership';

export interface PartnerOverride {
  classification: Classification;
  integrationType: IntegrationType;
  partnershipType: PartnershipType;
  category?: string;
}

/**
 * Keyed by company name (must match Airtable "App" field exactly).
 * Case-sensitive — normalize before lookup if needed.
 */
export const classificationOverrides: Record<string, PartnerOverride> = {

  // =========================================================================
  // LIVE (1)
  // =========================================================================
  'Ply': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Product Partnership',
    category: 'Fintech',
  },

  // =========================================================================
  // DISCOVERY (4)
  // =========================================================================
  'Torus AI': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'CSR AI',
  },
  'Fixle': {
    classification: 'Controlled',
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
    category: 'Automation',
  },
  'Townsquare Ignite': {
    classification: 'Open',
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
    category: 'Marketing',
  },
  'RealWork Labs': {
    classification: 'Open',
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
    category: 'Marketing',
  },

  // =========================================================================
  // NOT MOVING FORWARD (1)
  // =========================================================================
  'Stratify AI': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'CSR AI',
  },

  // =========================================================================
  // UNEXPLORED (8)
  // =========================================================================
  'Vistr': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Answering Service',
  },
  'Onduty24': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Trade Tools',
  },
  'HVACRanker': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'AI',
  },
  'Tekumbrella': {
    classification: 'Controlled',
    integrationType: 'Webhook',
    partnershipType: 'Ecosystem Partnership',
    category: 'Lead Gen',
  },
  'TEK Consulting LLC': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Business Ops & Growth',
  },
  'CaptureContact': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Answering Service',
  },
  'xceleran': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Accounting',
  },
  'Newo.AI': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'AI',
  },

  // =========================================================================
  // INITIAL CALL (53)
  // =========================================================================
  'Nuve': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Smart Thermostat',
  },
  'JustApp': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Productivity',
  },
  'LettrLabs': {
    classification: 'Open',
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
    category: 'Postcards',
  },
  'SurgePoint': {
    classification: 'Open',
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
    category: 'Reviews',
  },
  'Marchex': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Call/VOIP',
  },
  'Dexcomm Answering Service': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Answering Service',
  },
  'FieldStockPro Inc,': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Inventory Management',
  },
  'Neon Fox | Dialbox': {
    classification: 'Controlled',
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
    category: 'Answering Service',
  },
  'Revalytics': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Reporting',
  },
  'MyMethod, LLC': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'AI',
  },
  'ArcSite': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Trade Tools',
  },
  'Upstart': {
    classification: 'Open',
    integrationType: 'Embedded',
    partnershipType: 'Ecosystem Partnership',
    category: 'Financing',
  },
  'Applause': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Performance Pay',
  },
  'Review Harvest': {
    classification: 'Open',
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
    category: 'Reviews',
  },
  'Redo': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'CSR AI',
  },
  'Chapter One': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'AI',
  },
  'Serv': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Booking',
  },
  'Oply': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Job Inbox',
  },
  'Chatavise': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Reviews',
  },
  'HVAC Quote': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Trade Tools',
  },
  'LSArespond': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'CSR AI',
  },
  'Fizzy AI': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'AI',
  },
  'TeamBuyIn': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Performance Pay',
  },
  'Outreach Genius': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'CSR AI',
  },
  'Truly Legit': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Insurance',
  },
  'Checkr': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Background Checks',
  },
  'Hibu': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Reviews',
  },
  'Option Builder (Service MVP)': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Productivity',
  },
  'Noso Labs': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Trade Tools',
  },
  'Siro AI': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'AI',
  },
  'Vantaca': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'CRM',
  },
  'Prokeep': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Purchasing',
  },
  'Distance AI': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'CSR AI',
  },
  'TractorbeamAI': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'AI',
  },
  '1-800-REPAIRS': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Lead Gen',
  },
  'Hatch': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'CSR AI',
  },
  'Accuprice': {
    classification: 'Open',
    integrationType: 'Data Sync',
    partnershipType: 'Ecosystem Partnership',
    category: 'Pricebook',
  },
  'Frontdesk': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Answering Service',
  },
  'Blueboost': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Productivity',
  },
  'Sharewillow': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Payroll',
  },
  'Myreigns': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Performance Pay',
  },
  'Lowe\'s | Installation Made Easy': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Aggregator',
  },
  'Conju.ai': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Communication',
  },
  'Tooldesk.co': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'CSR AI',
  },
  'Aura.ai': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Marketing',
  },
  'Porch': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Aggregator',
  },
  'Carputty': {
    classification: 'Open',
    integrationType: 'Embedded',
    partnershipType: 'Ecosystem Partnership',
    category: 'Fintech',
  },
  'LeadChimp': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Lead Gen',
  },
  'Garage.com': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Lead Gen',
  },
  'Plecto': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Reporting',
  },
  'StreetFair': {
    classification: 'Controlled',
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
    category: 'Lead Gen',
  },
  'Lace AI': {
    classification: 'Controlled',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Call/VOIP',
  },
  'VIIRL': {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
    category: 'Marketing',
  },
};

/**
 * Airtable status → Dashboard status mapping.
 *
 * Airtable uses different stage names than the dashboard.
 * Apply this mapping when fetching from Airtable API.
 */
export const statusMapping: Record<string, string> = {
  'Live':                'Active',
  'Initial Call':        'Evaluating',
  'Discovery':           'Evaluating',
  'Unexplored':          'Evaluating',
  'Pilot':               'Onboarding',
  'Signed Agreements':   'Onboarding',
  'Not Moving forward':  'Declined',
  'Not Moving Forward':  'Declined',
  'Deactivated Partner': 'Declined',
  'Hidden Partner':      'Declined',
};

/**
 * Lookup helper. Returns override if found, or a sensible default.
 * Normalize the company name before lookup if Airtable data has inconsistent casing.
 */
export function getOverride(companyName: string): PartnerOverride {
  return classificationOverrides[companyName] ?? {
    classification: 'Open',
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  };
}

export function mapStatus(airtableStatus: string): string {
  return statusMapping[airtableStatus] ?? 'Evaluating';
}

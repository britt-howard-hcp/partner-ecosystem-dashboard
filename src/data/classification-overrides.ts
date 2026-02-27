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
    partnershipType: 'Product Partnership', // Deep two-way integration, dedicated eng
  },

  // =========================================================================
  // DISCOVERY (4)
  // =========================================================================
  'Torus AI': {
    classification: 'Controlled',   // CSR AI — touches customer communication
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Fixle': {
    classification: 'Controlled',   // Automation + Job Inbox — touches lead intake/job creation
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
  },
  'Townsquare Ignite': {
    classification: 'Open',         // Marketing platform — enhances workflows
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
  },
  'RealWork Labs': {
    classification: 'Open',         // Marketing/reviews/websites — enhances workflows
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
  },

  // =========================================================================
  // NOT MOVING FORWARD (1)
  // =========================================================================
  'Stratify AI': {
    classification: 'Controlled',   // CSR AI — touches customer communication
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },

  // =========================================================================
  // UNEXPLORED (8)
  // =========================================================================
  'Vistr': {
    classification: 'Controlled',   // AI receptionist — books appointments, touches scheduling
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Onduty24': {
    classification: 'Open',         // HVAC estimating software — trade tools
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'HVACRanker': {
    classification: 'Controlled',   // AI voice SDR — touches scheduling/customer communication
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Tekumbrella': {
    classification: 'Controlled',   // SMS lead capture — touches lead intake
    integrationType: 'Webhook',
    partnershipType: 'Ecosystem Partnership',
  },
  'TEK Consulting LLC': {
    classification: 'Open',         // ERP integration/consulting — business ops
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'CaptureContact': {
    classification: 'Controlled',   // AI call answering + booking — touches scheduling
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'xceleran': {
    classification: 'Open',         // Small business ERP via QuickBooks
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Newo.AI': {
    classification: 'Controlled',   // AI agents for phone — touches customer communication
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },

  // =========================================================================
  // INITIAL CALL (53)
  // =========================================================================
  'Nuve': {
    classification: 'Open',         // Smart thermostat automation — field tools
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'JustApp': {
    classification: 'Controlled',   // Custom branded app with job tracking — touches core workflows
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'LettrLabs': {
    classification: 'Open',         // Direct mail marketing automation
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
  },
  'SurgePoint': {
    classification: 'Open',         // Growth automation — reviews, referrals, rebooking
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
  },
  'Marchex': {
    classification: 'Controlled',   // Call tracking/intelligence — touches voice data
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Dexcomm Answering Service': {
    classification: 'Controlled',   // Answering service — creates jobs, touches scheduling
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'FieldStockPro Inc,': {
    classification: 'Open',         // Inventory management — field tools
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Neon Fox | Dialbox': {
    classification: 'Controlled',   // AI phone answering + booking — touches scheduling
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
  },
  'Revalytics': {
    classification: 'Controlled',   // Analytics touching customer data + advanced API
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'MyMethod, LLC': {
    classification: 'Controlled',   // AI voice — books appointments, touches scheduling
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'ArcSite': {
    classification: 'Open',         // Mobile CAD drawing — trade tools
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Upstart': {
    classification: 'Open',         // Consumer lending/financing — fintech widget
    integrationType: 'Embedded',
    partnershipType: 'Ecosystem Partnership',
  },
  'Applause': {
    classification: 'Open',         // Employee bonus/engagement — payroll/HR
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Review Harvest': {
    classification: 'Open',         // Review management — marketing
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
  },
  'Redo': {
    classification: 'Controlled',   // CSR AI — touches customer communication
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Chapter One': {
    classification: 'Controlled',   // AI agents + lead management + scheduling (HCP stays SOR)
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Serv': {
    classification: 'Controlled',   // E-commerce booking tool — touches scheduling
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Oply': {
    classification: 'Controlled',   // Job Inbox — touches lead intake
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Chatavise': {
    classification: 'Open',         // Reviews/surveys via text — marketing
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'HVAC Quote': {
    classification: 'Open',         // Online quote tool — trade tools/marketing
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'LSArespond': {
    classification: 'Controlled',   // AI + CSR AI + Job Inbox — touches lead intake
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Fizzy AI': {
    classification: 'Open',         // API normalization layer — infrastructure tool
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'TeamBuyIn': {
    classification: 'Open',         // Performance pay — payroll/HR
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Outreach Genius': {
    classification: 'Controlled',   // CSR AI + demand gen — touches customer communication
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Truly Legit': {
    classification: 'Open',         // Insurance verification
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Checkr': {
    classification: 'Open',         // Background checks
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Hibu': {
    classification: 'Open',         // Reviews/marketing — took over Signpost integration
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Option Builder (Service MVP)': {
    classification: 'Open',         // AI sales proposals — productivity tool
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Noso Labs': {
    classification: 'Open',         // HVAC trade tools — diagnostics, manuals, proposals
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Siro AI': {
    classification: 'Open',         // Call/sales review coaching — analytics
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Vantaca': {
    classification: 'Controlled',   // Property management SOR — touches job creation
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Prokeep': {
    classification: 'Open',         // Distributor communication/POs — purchasing
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Distance AI': {
    classification: 'Controlled',   // CSR AI — touches customer communication
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'TractorbeamAI': {
    classification: 'Open',         // General AI automation
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  '1-800-REPAIRS': {
    classification: 'Controlled',   // Lead gen + Job Inbox — touches lead intake
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Hatch': {
    classification: 'Controlled',   // CSR AI + chat — touches customer communication
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Accuprice': {
    classification: 'Open',         // Pricebook/CSV tool — trade tools
    integrationType: 'Data Sync',
    partnershipType: 'Ecosystem Partnership',
  },
  'Frontdesk': {
    classification: 'Controlled',   // AI receptionist — books appointments
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Blueboost': {
    classification: 'Open',         // AI estimate writer — productivity tool
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Sharewillow': {
    classification: 'Open',         // Incentive plan management — payroll/HR
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Myreigns': {
    classification: 'Open',         // Phantom equity/performance pay — payroll/HR
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Lowe\'s | Installation Made Easy': {
    classification: 'Controlled',   // Job distribution aggregator — touches lead intake
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Conju.ai': {
    classification: 'Controlled',   // AI texts after missed calls — touches customer communication
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Tooldesk.co': {
    classification: 'Controlled',   // Pivoted to CSR AI — touches customer communication
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Aura.ai': {
    classification: 'Open',         // Consumer-facing maintenance/lead gen — marketing
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Porch': {
    classification: 'Controlled',   // Lead aggregator + Job Inbox — touches lead intake
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Carputty': {
    classification: 'Open',         // Auto credit line — fintech/fleet
    integrationType: 'Embedded',
    partnershipType: 'Ecosystem Partnership',
  },
  'LeadChimp': {
    classification: 'Controlled',   // Lead gen — touches lead intake
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Garage.com': {
    classification: 'Controlled',   // Lead gen + Job Inbox — touches lead intake
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'Plecto': {
    classification: 'Open',         // Reporting/dashboarding — analytics
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'StreetFair': {
    classification: 'Controlled',   // Lead gen + Job Inbox — touches lead intake
    integrationType: 'OAuth',
    partnershipType: 'Ecosystem Partnership',
  },
  'Lace AI': {
    classification: 'Controlled',   // Call intelligence/VOIP — touches voice data
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
  },
  'VIIRL': {
    classification: 'Open',         // Multi-channel marketing platform
    integrationType: 'API',
    partnershipType: 'Ecosystem Partnership',
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
  'Not Moving Forward':  'Declined',      // handle case variation
  'Deactivated Partner': 'Declined',
  'Hidden Partner':      'Declined',       // or exclude entirely
};

/**
 * Lookup helper. Returns override if found, or a sensible default.
 * Normalize the company name before lookup if Airtable data has inconsistent casing.
 */
export function getOverride(companyName: string): PartnerOverride {
  return classificationOverrides[companyName] ?? {
    classification: 'Open',                    // safe default
    integrationType: 'API',                    // most common
    partnershipType: 'Ecosystem Partnership',
  };
}

export function mapStatus(airtableStatus: string): string {
  return statusMapping[airtableStatus] ?? 'Evaluating';
}

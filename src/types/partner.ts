export type Status = 'Evaluating' | 'Onboarding' | 'Active' | 'Declined';

export type Classification = 'Core Conflict' | 'Controlled' | 'Open';

export type PartnershipType = 'Product Partnership' | 'Ecosystem Partnership';

export type IntegrationType = 'API' | 'Webhook' | 'OAuth' | 'Embedded' | 'Data Sync' | 'White Label';

export interface Partner {
  id: string;
  name: string;
  website?: string;
  description?: string;
  classification: Classification;
  partnershipType: PartnershipType;
  status: Status;
  integrationType: IntegrationType;
  requestDate?: string;
  customerCount?: number;
  integrationRequest?: string;
  whyIntegrate?: string;
  mutualCustomers?: number;
  contactName?: string;
  contactEmail?: string;
  notes?: string;
}

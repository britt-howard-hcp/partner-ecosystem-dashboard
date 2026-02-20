export type PipelineStage = 'Evaluating' | 'Onboarding' | 'Active' | 'Declined';

export type PartnerCategory =
  | 'AI & Automation Tools'
  | 'Customer Communication Tools'
  | 'Marketing Platforms'
  | 'Scheduling & Dispatch Tools'
  | 'Other Trade-Specific Platforms';

export type IntegrationType = 'API' | 'Webhook' | 'OAuth' | 'Embedded' | 'Data Sync' | 'White Label';

export interface Partner {
  id: string;
  name: string;
  stage: PipelineStage;
  category: PartnerCategory;
  integrationType: IntegrationType;
  requestDate: string; // ISO date
  description: string;
  customerCount: number;
}

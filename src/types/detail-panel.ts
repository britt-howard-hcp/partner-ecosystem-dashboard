import type { Partner, PartnerCategory } from './partner';

export type DetailPanelView =
  | { kind: 'partner'; partner: Partner }
  | { kind: 'category'; category: PartnerCategory; partners: Partner[] }
  | null;

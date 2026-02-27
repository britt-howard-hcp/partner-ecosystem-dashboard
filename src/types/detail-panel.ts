import type { Partner, Classification } from './partner';

export type DetailPanelView =
  | { kind: 'partner'; partner: Partner }
  | { kind: 'classification'; classification: Classification; partners: Partner[] }
  | { kind: 'list'; title: string; partners: Partner[] }
  | null;

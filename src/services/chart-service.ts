import type { Partner, Classification } from '../types/partner';

export interface VolumeDataPoint {
  month: string; // "Jun 2024"
  count: number;
}

export interface ClassificationDataPoint {
  name: Classification;
  value: number;
  color: string;
}

export interface ClassificationVolumeDataPoint {
  classification: Classification;
  count: number;
  color: string;
}

const classificationColorMap: Record<Classification, string> = {
  'Core Conflict': '#ef4444',
  'Controlled': '#f59e0b',
  'Open': '#10b981',
};

export function getClassificationColor(classification: Classification): string {
  return classificationColorMap[classification];
}

export function getClassificationColorMap(): Record<Classification, string> {
  return classificationColorMap;
}

export function buildVolumeData(partners: Partner[]): VolumeDataPoint[] {
  const dated = partners.filter((p) => p.requestDate);
  const buckets = new Map<string, number>();

  for (const p of dated) {
    const d = new Date(p.requestDate!);
    const key = `${d.toLocaleString('en-US', { month: 'short' })} ${d.getFullYear()}`;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }

  const dates = dated.map((p) => new Date(p.requestDate!)).sort((a, b) => a.getTime() - b.getTime());
  if (dates.length === 0) return [];

  const result: VolumeDataPoint[] = [];
  const cursor = new Date(dates[0].getFullYear(), dates[0].getMonth(), 1);
  const end = new Date(dates[dates.length - 1].getFullYear(), dates[dates.length - 1].getMonth(), 1);

  while (cursor <= end) {
    const key = `${cursor.toLocaleString('en-US', { month: 'short' })} ${cursor.getFullYear()}`;
    result.push({ month: key, count: buckets.get(key) ?? 0 });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return result;
}

export function buildClassificationData(partners: Partner[]): ClassificationDataPoint[] {
  const counts = new Map<Classification, number>();
  for (const p of partners) {
    counts.set(p.classification, (counts.get(p.classification) ?? 0) + 1);
  }
  return (Object.keys(classificationColorMap) as Classification[]).map((cls) => ({
    name: cls,
    value: counts.get(cls) ?? 0,
    color: classificationColorMap[cls],
  }));
}

export function buildClassificationVolumeData(partners: Partner[]): ClassificationVolumeDataPoint[] {
  const counts = new Map<Classification, number>();
  for (const p of partners) {
    counts.set(p.classification, (counts.get(p.classification) ?? 0) + 1);
  }
  return (Object.keys(classificationColorMap) as Classification[])
    .map((cls) => ({
      classification: cls,
      count: counts.get(cls) ?? 0,
      color: classificationColorMap[cls],
    }))
    .sort((a, b) => b.count - a.count);
}

// ─── Category Distribution ───────────────────────────────────────

export interface CategoryDistributionDataPoint {
  category: string;
  count: number;
}

export function buildCategoryDistributionData(partners: Partner[]): CategoryDistributionDataPoint[] {
  const counts = new Map<string, number>();
  for (const p of partners) {
    const cat = p.category || 'Uncategorized';
    counts.set(cat, (counts.get(cat) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

// ─── Status Distribution ─────────────────────────────────────────

export interface StatusDistributionDataPoint {
  stage: string;
  count: number;
  color: string;
}

/** Pipeline stage order and colors. */
const stageOrder = [
  'Unexplored',
  'Initial Call',
  'Discovery',
  'Pilot',
  'Signed Agreements',
  'Live',
  'Not Moving Forward',
  'Deactivated Partner',
  'Hidden Partner',
] as const;

const stageColorMap: Record<string, string> = {
  'Unexplored':          '#94a3b8', // slate
  'Initial Call':        '#6366f1', // indigo
  'Discovery':           '#8b5cf6', // violet
  'Pilot':               '#06b6d4', // cyan
  'Signed Agreements':   '#14b8a6', // teal
  'Live':                '#10b981', // emerald
  'Not Moving Forward':  '#ef4444', // red
  'Deactivated Partner': '#f87171', // red-light
  'Hidden Partner':      '#78716c', // stone
};

export function buildStatusDistributionData(partners: Partner[]): StatusDistributionDataPoint[] {
  const counts = new Map<string, number>();
  for (const p of partners) {
    const stage = p.airtableStatus || 'Unknown';
    counts.set(stage, (counts.get(stage) ?? 0) + 1);
  }
  return stageOrder
    .map((stage) => ({
      stage,
      count: counts.get(stage) ?? 0,
      color: stageColorMap[stage] ?? '#94a3b8',
    }))
    .filter((d) => d.count > 0);
}

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

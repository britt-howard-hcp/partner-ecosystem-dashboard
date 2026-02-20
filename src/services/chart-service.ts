import type { Partner, PartnerCategory } from '../types/partner';

export interface VolumeDataPoint {
  month: string; // "Jun 2024"
  count: number;
}

export interface CategoryDataPoint {
  name: PartnerCategory;
  value: number;
  color: string;
}

export interface CategoryVolumeDataPoint {
  category: PartnerCategory;
  count: number;
  color: string;
}

const categoryColorMap: Record<PartnerCategory, string> = {
  'AI & Automation Tools': '#8b5cf6',
  'Customer Communication Tools': '#06b6d4',
  'Marketing Platforms': '#f59e0b',
  'Scheduling & Dispatch Tools': '#10b981',
  'Other Trade-Specific Platforms': '#ec4899',
};

export function getCategoryColor(category: PartnerCategory): string {
  return categoryColorMap[category];
}

export function buildVolumeData(partners: Partner[]): VolumeDataPoint[] {
  const buckets = new Map<string, number>();

  for (const p of partners) {
    const d = new Date(p.requestDate);
    const key = `${d.toLocaleString('en-US', { month: 'short' })} ${d.getFullYear()}`;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }

  // Build a continuous month range from earliest to latest
  const dates = partners.map((p) => new Date(p.requestDate)).sort((a, b) => a.getTime() - b.getTime());
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

export function buildCategoryData(partners: Partner[]): CategoryDataPoint[] {
  const counts = new Map<PartnerCategory, number>();
  for (const p of partners) {
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  }
  return (Object.keys(categoryColorMap) as PartnerCategory[]).map((cat) => ({
    name: cat,
    value: counts.get(cat) ?? 0,
    color: categoryColorMap[cat],
  }));
}

export function buildCategoryVolumeData(partners: Partner[]): CategoryVolumeDataPoint[] {
  const counts = new Map<PartnerCategory, number>();
  for (const p of partners) {
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  }
  return (Object.keys(categoryColorMap) as PartnerCategory[])
    .map((cat) => ({
      category: cat,
      count: counts.get(cat) ?? 0,
      color: categoryColorMap[cat],
    }))
    .sort((a, b) => b.count - a.count);
}

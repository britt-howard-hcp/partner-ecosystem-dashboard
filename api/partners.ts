import type { VercelRequest, VercelResponse } from '@vercel/node';

const PAT = process.env.AIRTABLE_PAT;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE = process.env.AIRTABLE_TABLE_NAME ?? 'Partner Directory';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (!PAT || !BASE_ID) {
    return res.status(500).json({ error: 'Missing Airtable credentials' });
  }

  try {
    const allRecords: unknown[] = [];
    let offset: string | undefined;
    const filter = encodeURIComponent("NOT({Status}='')");

    do {
      const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}?filterByFormula=${filter}${offset ? `&offset=${offset}` : ''}`;
      const resp = await fetch(url, {
        headers: { Authorization: `Bearer ${PAT}` },
      });

      if (!resp.ok) {
        const text = await resp.text();
        return res.status(resp.status).json({ error: 'Airtable API error', detail: text });
      }

      const data = await resp.json();
      allRecords.push(...data.records);
      offset = data.offset;
    } while (offset);

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json(allRecords);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', detail: String(err) });
  }
}

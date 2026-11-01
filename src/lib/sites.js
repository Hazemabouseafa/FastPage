import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const siteDir = fileURLToPath(new URL('../../data/sites/', import.meta.url));
const slugPattern = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
export const reservedSlugs = new Set(['www','admin','api','mail','smtp','ftp','static','app','support']);
export async function getSite(slug) {
  if (!slugPattern.test(slug) || reservedSlugs.has(slug)) return null;
  try {
    const s = JSON.parse(await readFile(join(siteDir, slug + '.json'), 'utf8'));
    if (s.published === false || !['business','restaurant','portfolio'].includes(s.template)) return null;
    return s;
  } catch { return null; }
}
export async function getPublicSites() {
  const result = [];
  const files = await readdir(siteDir);
  for (const name of files.filter(x => x.endsWith('.json'))) {
    const slug = name.slice(0, -5);
    const site = await getSite(slug);
    if (site && site.isDemo) result.push({slug, site});
  }
  return result;
}
export function subdomainFromHost(host, baseDomain) {
  const hostname = String(host || '').split(':')[0].toLowerCase().replace(/\.$/, '');
  const base = baseDomain.toLowerCase().replace(/\.$/, '');
  if ([base, `www.${base}`, 'localhost', '127.0.0.1'].includes(hostname)) return null;
  for (const suffix of [`.${base}`, '.localhost']) {
    if (hostname.endsWith(suffix)) {
      const sub = hostname.slice(0, -suffix.length);
      return slugPattern.test(sub) && !reservedSlugs.has(sub) ? sub : null;
    }
  }
  return null;
}

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const here = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(here, '../src/data/websites.json'), 'utf8'));
const expected = { ai: 40, social: 20, games: 25, development: 35, education: 25, design: 30, productivity: 25, entertainment: 20, research: 20, utilities: 25, business: 15, technology: 20 };
const counts = Object.fromEntries(Object.keys(expected).map((key) => [key, data.filter((site) => site.category === key).length]));
const unique = (values) => new Set(values).size === values.length;
const checks = {
  exactly300: data.length === 300,
  uniqueIds: unique(data.map((site) => site.id)),
  uniqueHosts: unique(data.map((site) => site.domain)),
  validHttpsUrls: data.every((site) => { try { const url = new URL(site.url); return url.protocol === 'https:' && url.hostname === site.domain; } catch { return false; } }),
  completeFields: data.every((site) => ['id','name','url','domain','description','category','subcategory','tags','pricing','platform','featured','status'].every((key) => site[key] !== undefined)),
  knownCategories: data.every((site) => expected[site.category] !== undefined),
  distributionMatches: Object.entries(expected).every(([key, count]) => counts[key] === count),
  defaultStatusUnchecked: data.every((site) => site.status === 'unchecked'),
};
console.log(JSON.stringify({ checks, counts, total: data.length, uniqueIds: new Set(data.map((x) => x.id)).size, uniqueHosts: new Set(data.map((x) => x.domain)).size }, null, 2));
if (Object.values(checks).some((ok) => !ok)) process.exit(1);

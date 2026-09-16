// Shared helpers for Draftsman scripts. No dependencies.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Split a markdown file into { data, body }. Supports flat `key: value` YAML only. */
export function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: null, body: text };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (/^".*"$/.test(v) || /^'.*'$/.test(v)) v = v.slice(1, -1);
    if (v === 'true') v = true; else if (v === 'false') v = false;
    data[kv[1]] = v;
  }
  return { data, body: m[2] };
}

export function listFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...listFiles(p));
    else out.push(p);
  }
  return out;
}

export function loadSkills() {
  const dir = join(ROOT, 'skills');
  return readdirSync(dir)
    .filter((d) => existsSync(join(dir, d, 'SKILL.md')))
    .sort()
    .map((d) => {
      const path = join(dir, d, 'SKILL.md');
      const { data, body } = parseFrontmatter(readFileSync(path, 'utf8'));
      return { dir: d, path, data, body, userInvocable: data?.['user-invocable'] !== false };
    });
}

export function loadAgents() {
  const dir = join(ROOT, 'agents');
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const path = join(dir, f);
      const { data, body } = parseFrontmatter(readFileSync(path, 'utf8'));
      return { file: f, path, data, body };
    });
}

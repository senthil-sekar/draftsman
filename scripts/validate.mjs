#!/usr/bin/env node
// Structural checks for the Draftsman plugin. Exit 1 on any error.
import { readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ROOT, loadSkills, loadAgents, listFiles } from './lib.mjs';

const errors = [];
const err = (m) => errors.push(m);
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// 1. Manifests
for (const f of ['.claude-plugin/plugin.json', '.claude-plugin/marketplace.json']) {
  try {
    const j = JSON.parse(readFileSync(join(ROOT, f), 'utf8'));
    if (f.endsWith('plugin.json')) {
      if (!KEBAB.test(j.name ?? '')) err(`${f}: name must be kebab-case`);
      if (!/^\d+\.\d+\.\d+/.test(j.version ?? '')) err(`${f}: version must be semver`);
    } else if (!Array.isArray(j.plugins) || j.plugins.length === 0) {
      err(`${f}: plugins must be a non-empty array`);
    }
  } catch (e) { err(`${f}: ${e.message}`); }
}

// 2. Skills
const skills = loadSkills();
const skillNames = new Set();
for (const s of skills) {
  const where = relative(ROOT, s.path);
  if (!s.data) { err(`${where}: missing frontmatter`); continue; }
  if (s.data.name !== s.dir) err(`${where}: name "${s.data.name}" must match directory "${s.dir}"`);
  if (!KEBAB.test(s.data.name ?? '') || s.data.name.length > 64) err(`${where}: invalid name`);
  if (!s.data.description) err(`${where}: missing description`);
  else if (s.data.description.length > 1024) err(`${where}: description over 1024 chars`);
  skillNames.add(s.data.name);
}
for (const required of ['start', 'clarify', 'options', 'decide', 'doc', 'review', 'status', 'rightsizing', 'design-catalog']) {
  if (!skillNames.has(required)) err(`skills/${required}: missing`);
}

// 3. Agents
const agents = loadAgents();
const agentNames = new Set();
for (const a of agents) {
  const where = relative(ROOT, a.path);
  if (!a.data) { err(`${where}: missing frontmatter`); continue; }
  if (`${a.data.name}.md` !== a.file) err(`${where}: name must match file name`);
  if (!a.data.description) err(`${where}: missing description`);
  agentNames.add(a.data.name);
}

// 4. Cross-references in markdown
const mdFiles = listFiles(ROOT).filter((p) => p.endsWith('.md') && !p.includes('node_modules') && !p.includes(`${'/'}.git${'/'}`) && !relative(ROOT, p).startsWith('examples') && !relative(ROOT, p).startsWith('dist'));
for (const p of mdFiles) {
  const text = readFileSync(p, 'utf8');
  const where = relative(ROOT, p);
  for (const m of text.matchAll(/\$\{CLAUDE_PLUGIN_ROOT\}\/([^\s`)'"]+)/g)) {
    const target = m[1].replace(/[.,:;]+$/, '');
    if (!existsSync(join(ROOT, target))) err(`${where}: broken path \${CLAUDE_PLUGIN_ROOT}/${target}`);
  }
  for (const m of text.matchAll(/the `([a-z-]+)` agent/g)) {
    if (!agentNames.has(m[1])) err(`${where}: unknown agent "${m[1]}"`);
  }
  for (const m of text.matchAll(/the `([a-z-]+)` skill/g)) {
    if (!skillNames.has(m[1])) err(`${where}: unknown skill "${m[1]}"`);
  }
  for (const m of text.matchAll(/\/draftsman:([a-z-]+)/g)) {
    if (!skillNames.has(m[1])) err(`${where}: unknown command /draftsman:${m[1]}`);
  }
}

// 5. Template JSON
try { JSON.parse(readFileSync(join(ROOT, 'templates/draftsman.json'), 'utf8')); }
catch (e) { err(`templates/draftsman.json: ${e.message}`); }

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n  - ${errors.join('\n  - ')}`);
  process.exit(1);
}
console.log(`✓ Draftsman valid: ${skills.length} skills, ${agents.length} agents, ${mdFiles.length} markdown files checked`);

#!/usr/bin/env node
// Structural checks for the Draftsman plugin. Exit 1 on any error.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ROOT, loadSkills, loadAgents, listFiles, parseFrontmatter } from './lib.mjs';

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
for (const required of ['start', 'clarify', 'options', 'decide', 'doc', 'review', 'status', 'evolve', 'rightsizing', 'design-catalog', 'domain-insurance']) {
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
const mdFiles = listFiles(ROOT).filter((p) => p.endsWith('.md') && !p.includes('node_modules') && !p.includes(`${'/'}.git${'/'}`) && !['examples', 'dist', 'evals'].some((d) => relative(ROOT, p).startsWith(d)));
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

// 6. Eval cases (structure only; `npm run eval` runs them)
const GRADER_TYPES = new Set(['regex', 'tool_used', 'tool_order', 'file_exists', 'llm', 'baseline']);
const evalsDir = join(ROOT, 'evals');
let evalCases = 0;
if (existsSync(evalsDir)) {
  for (const name of readdirSync(evalsDir)) {
    const dir = join(evalsDir, name);
    if (['results', 'mocks'].includes(name) || !statSync(dir).isDirectory()) continue;
    evalCases++;
    const where = `evals/${name}`;
    const caseYaml = join(dir, 'case.yaml');
    if (!existsSync(join(dir, 'prompt.md')) && !existsSync(caseYaml)) err(`${where}: needs prompt.md or case.yaml`);
    if (existsSync(caseYaml)) {
      const script = readFileSync(caseYaml, 'utf8').match(/scaffold_script:\s*(\S+)/)?.[1];
      if (script && !existsSync(join(dir, script))) err(`${where}: scaffold_script ${script} not found`);
    }
    const gradersDir = join(dir, 'graders');
    const graders = existsSync(gradersDir) ? readdirSync(gradersDir).filter((f) => f.endsWith('.md')) : [];
    if (!graders.length) err(`${where}: no graders/*.md`);
    for (const g of graders) {
      const { data } = parseFrontmatter(readFileSync(join(gradersDir, g), 'utf8'));
      if (!GRADER_TYPES.has(data?.type)) { err(`${where}/graders/${g}: unknown type "${data?.type}"`); continue; }
      if (data.type === 'regex') {
        try { new RegExp(data.pattern ?? '', data.flags ?? ''); }
        catch (e) { err(`${where}/graders/${g}: bad pattern: ${e.message}`); }
      }
    }
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n  - ${errors.join('\n  - ')}`);
  process.exit(1);
}
console.log(`✓ Draftsman valid: ${skills.length} skills, ${agents.length} agents, ${mdFiles.length} markdown files, ${evalCases} eval cases checked`);

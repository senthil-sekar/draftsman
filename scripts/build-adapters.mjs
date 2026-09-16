#!/usr/bin/env node
// Generate Draftsman files for IDEs other than Claude Code.
//
//   node scripts/build-adapters.mjs --target cursor  --out /path/to/your/project
//   node scripts/build-adapters.mjs --target copilot --out /path/to/your/project
//   node scripts/build-adapters.mjs --target generic --out /path/to/your/project
//   node scripts/build-adapters.mjs --target all     --out ./dist
//
// Claude Code needs no build step: install the plugin directly.
import { mkdirSync, writeFileSync, readFileSync, cpSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { ROOT, loadSkills, loadAgents } from './lib.mjs';

const TARGETS = {
  cursor: {
    root: '.cursor/draftsman',
    commandRef: (n) => `/draftsman-${n}`,
    commandPath: (n) => `.cursor/commands/draftsman-${n}.md`,
    commandFile: (s, body) => body,
    rulePath: '.cursor/rules/draftsman.mdc',
    ruleFile: (body) =>
      `---\ndescription: Draftsman system design workflow rules. Apply when working on files in docs/design or when running a draftsman command.\nglobs: docs/design/**\nalwaysApply: false\n---\n\n${body}`,
  },
  copilot: {
    root: '.github/draftsman',
    commandRef: (n) => `/draftsman-${n}`,
    commandPath: (n) => `.github/prompts/draftsman-${n}.prompt.md`,
    commandFile: (s, body) => `---\ndescription: ${JSON.stringify(s.data.description)}\n---\n\n${body}`,
    rulePath: '.github/instructions/draftsman.instructions.md',
    ruleFile: (body) => `---\napplyTo: "docs/design/**"\n---\n\n${body}`,
  },
  generic: {
    root: '.draftsman',
    commandRef: (n) => `the "draftsman ${n}" prompt (.draftsman/commands/${n}.md)`,
    commandPath: (n) => `.draftsman/commands/${n}.md`,
    commandFile: (s, body) => body,
    rulePath: '.draftsman/AGENTS.snippet.md',
    ruleFile: (body) =>
      `<!-- Paste this section into your AGENTS.md (or your agent's instructions file). -->\n\n## Draftsman\n\nFor system design work, follow the prompts in \`.draftsman/commands/\` (start with \`start.md\`) and the rules below.\n\n${body.replace(/^# /m, '### ')}`,
  },
};

/** Rewrite Claude Code-specific references for another IDE. */
function port(text, t) {
  return text
    .replaceAll('${CLAUDE_PLUGIN_ROOT}', t.root)
    .replace(/Delegate to the `([a-z-]+)` agent/g, (_, a) => `Run a separate, focused pass following \`${t.root}/agents/${a}.md\``)
    .replace(/the `([a-z-]+)` agent/g, (_, a) => `the ${a} pass (\`${t.root}/agents/${a}.md\`)`)
    .replace(/the `([a-z-]+)` skill/g, (_, s) => `the ${s} guide (\`${t.root}/skills/${s}/SKILL.md\`)`)
    .replace(/\/draftsman:([a-z-]+)/g, (_, n) => t.commandRef(n))
    .replaceAll('`$ARGUMENTS`', 'the command arguments')
    .replaceAll('$ARGUMENTS', 'the text the user typed after the command');
}

function write(out, rel, content) {
  const p = join(out, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  return rel;
}

function build(name, out) {
  const t = TARGETS[name];
  const written = [];
  const skills = loadSkills();

  // Knowledge, templates, and rules, copied under the target root with paths rewritten.
  const copyMd = (srcRel) => {
    const text = readFileSync(join(ROOT, srcRel), 'utf8');
    written.push(write(out, `${t.root}/${srcRel}`, port(text, t)));
  };
  for (const s of skills.filter((s) => !s.userInvocable)) {
    copyMd(`skills/${s.dir}/SKILL.md`);
    const refs = join(ROOT, 'skills', s.dir, 'references');
    if (existsSync(refs)) {
      cpSync(refs, join(out, t.root, 'skills', s.dir, 'references'), { recursive: true });
      written.push(`${t.root}/skills/${s.dir}/references/`);
    }
  }
  // Command skills are also copied so cross-references ("read .../skills/clarify/SKILL.md") resolve.
  for (const s of skills.filter((s) => s.userInvocable)) copyMd(`skills/${s.dir}/SKILL.md`);
  for (const a of loadAgents()) {
    written.push(write(out, `${t.root}/agents/${a.file}`, `# ${a.data.name}\n\n${port(a.body, t).trim()}\n`));
  }
  cpSync(join(ROOT, 'templates'), join(out, t.root, 'templates'), { recursive: true });
  written.push(`${t.root}/templates/`);
  copyMd('rules/core-rules.md');

  // Always-available rules file.
  const rules = port(readFileSync(join(ROOT, 'rules/core-rules.md'), 'utf8'), t);
  written.push(write(out, t.rulePath, t.ruleFile(rules)));

  // One command/prompt per user-invocable skill.
  for (const s of skills.filter((s) => s.userInvocable)) {
    const hint = s.data['argument-hint'] ? `\n> Usage: ${t.commandRef(s.dir)} ${s.data['argument-hint']}\n` : '';
    const body = port(s.body, t).trimStart().replace(/^(# .*\n)/m, `$1${hint}`);
    written.push(write(out, t.commandPath(s.dir), t.commandFile(s, body)));
  }
  return written;
}

// ---- CLI ----
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => (a.startsWith('--') ? [...acc, [a.slice(2), arr[i + 1]]] : acc), []),
);
const target = args.target;
const out = resolve(args.out ?? process.cwd());
if (!target || !(target in TARGETS || target === 'all')) {
  console.error('Usage: node scripts/build-adapters.mjs --target <cursor|copilot|generic|all> [--out <dir>]');
  process.exit(2);
}
const names = target === 'all' ? Object.keys(TARGETS) : [target];
for (const n of names) {
  const dest = target === 'all' ? join(out, n) : out;
  const files = build(n, dest);
  console.log(`✓ ${n}: ${files.length} entries written to ${dest}`);
}

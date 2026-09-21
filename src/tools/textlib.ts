export function toCase(text: string, mode: string): string {
  const words = text.replace(/[_-]+/g, ' ').split(/\s+/).filter(Boolean);
  switch (mode) {
    case 'upper': return text.toUpperCase();
    case 'lower': return text.toLowerCase();
    case 'title': return text.toLowerCase().replace(/(^|\s|[("'])\S/g, (c) => c.toUpperCase());
    case 'sentence': {
      const lower = text.toLowerCase();
      return lower.replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    }
    case 'camel': return words.map((w, i) => i === 0 ? w.toLowerCase() : cap(w)).join('');
    case 'pascal': return words.map(cap).join('');
    case 'snake': return words.map((w) => w.toLowerCase()).join('_');
    case 'kebab': return words.map((w) => w.toLowerCase()).join('-');
    case 'inverse': return text.replace(/[a-zA-Z]/g, (c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase());
    default: return text;
  }
}
function cap(w: string): string { return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(); }
export function dedupeLines(text: string, ignoreCase = false, trim = true): { out: string; removed: number } {
  const seen = new Set<string>();
  const kept: string[] = [];
  let removed = 0;
  for (const line of text.split('\n')) {
    const key = (trim ? line.trim() : line);
    const k = ignoreCase ? key.toLowerCase() : key;
    if (seen.has(k)) { removed++; continue; }
    seen.add(k);
    kept.push(line);
  }
  return { out: kept.join('\n'), removed };
}
export function sortLines(text: string, mode: 'az' | 'za' | 'len' | 'len-desc' | 'numeric'): string {
  const lines = text.split('\n');
  const cmp: Record<string, (a: string, b: string) => number> = {
    az: (a, b) => a.localeCompare(b),
    za: (a, b) => b.localeCompare(a),
    len: (a, b) => a.length - b.length,
    'len-desc': (a, b) => b.length - a.length,
    numeric: (a, b) => (parseFloat(a) || 0) - (parseFloat(b) || 0),
  };
  return [...lines].sort(cmp[mode]).join('\n');
}
export function cleanWhitespace(text: string, opts: { trimLines: boolean; collapseSpaces: boolean; collapseBlank: boolean }): string {
  let out = text;
  if (opts.trimLines) out = out.split('\n').map((l) => l.trimEnd()).join('\n');
  if (opts.collapseSpaces) out = out.replace(/[^\S\n]+/g, ' ');
  if (opts.collapseBlank) out = out.replace(/\n{3,}/g, '\n\n');
  return out;
}
// Simple LCS-based line diff: returns rows tagged equal/add/del
export interface DiffRow { kind: 'same' | 'add' | 'del'; text: string }
export function diffLines(a: string, b: string): DiffRow[] {
  const A = a.split('\n'), B = b.split('\n');
  const m = A.length, n = B.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--)
    dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const rows: DiffRow[] = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (A[i] === B[j]) { rows.push({ kind: 'same', text: A[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { rows.push({ kind: 'del', text: A[i] }); i++; }
    else { rows.push({ kind: 'add', text: B[j] }); j++; }
  }
  while (i < m) rows.push({ kind: 'del', text: A[i++] });
  while (j < n) rows.push({ kind: 'add', text: B[j++] });
  return rows;
}
export function reverseText(text: string, mode: 'chars' | 'words' | 'lines'): string {
  if (mode === 'chars') return [...text].reverse().join('');
  if (mode === 'words') return text.split(/(\s+)/).reverse().join('');
  return text.split('\n').reverse().join('\n');
}
export function findReplace(text: string, find: string, replace: string, useRegex: boolean, ignoreCase: boolean): { out: string; count: number } {
  if (!find) return { out: text, count: 0 };
  const flags = 'g' + (ignoreCase ? 'i' : '');
  const re = useRegex ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
  let count = 0;
  const out = text.replace(re, (...args) => {
    count++;
    const groups = args.slice(1, -2) as string[];
    return replace.replace(/\$(\d+|\$)/g, (m, g) => (g === '$' ? '$' : (groups[Number(g) - 1] ?? '')));
  });
  return { out, count };
}

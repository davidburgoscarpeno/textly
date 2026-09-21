import { useMemo, useState } from 'react';
import { toCase, dedupeLines, sortLines, cleanWhitespace, diffLines, reverseText, findReplace } from './textlib';

function Area({ label, value, onChange, rows = 8 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (<><label>{label}</label><textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} /></>);
}
function Out({ text }: { text: string }) {
  return (<>
    <textarea rows={8} readOnly value={text} onFocus={(e) => e.target.select()} />
    <div className="btn-row"><button className="secondary" onClick={() => navigator.clipboard.writeText(text)}>Copy result</button></div>
  </>);
}
export function CaseTool() {
  const [text, setText] = useState(''); const [mode, setMode] = useState('title');
  const out = useMemo(() => toCase(text, mode), [text, mode]);
  const opts: [string, string][] = [['upper', 'UPPERCASE'], ['lower', 'lowercase'], ['title', 'Title Case'], ['sentence', 'Sentence case'], ['camel', 'camelCase'], ['pascal', 'PascalCase'], ['snake', 'snake_case'], ['kebab', 'kebab-case'], ['inverse', 'iNVERSE cASE']];
  return (
    <div className="panel">
      <Area label="Your text" value={text} onChange={setText} />
      <div className="btn-row">{opts.map(([v, l]) => <button key={v} className={mode === v ? '' : 'secondary'} onClick={() => setMode(v)}>{l}</button>)}</div>
      {text && <Out text={out} />}
    </div>
  );
}
export function DedupeTool() {
  const [text, setText] = useState(''); const [ic, setIc] = useState(false);
  const r = useMemo(() => dedupeLines(text, ic), [text, ic]);
  return (
    <div className="panel">
      <Area label="Lines" value={text} onChange={setText} />
      <label><input type="checkbox" checked={ic} onChange={(e) => setIc(e.target.checked)} /> Ignore case when comparing</label>
      {text && <><p>{r.removed} duplicate{r.removed === 1 ? '' : 's'} removed.</p><Out text={r.out} /></>}
    </div>
  );
}
export function SortTool() {
  const [text, setText] = useState(''); const [mode, setMode] = useState<'az' | 'za' | 'len' | 'len-desc' | 'numeric'>('az');
  const out = useMemo(() => sortLines(text, mode), [text, mode]);
  return (
    <div className="panel">
      <Area label="Lines to sort" value={text} onChange={setText} />
      <div className="btn-row">
        {([['az', 'A to Z'], ['za', 'Z to A'], ['len', 'Shortest first'], ['len-desc', 'Longest first'], ['numeric', 'Numeric']] as const).map(([v, l]) =>
          <button key={v} className={mode === v ? '' : 'secondary'} onClick={() => setMode(v)}>{l}</button>)}
      </div>
      {text && <Out text={out} />}
    </div>
  );
}
export function WhitespaceTool() {
  const [text, setText] = useState('');
  const [opts, setOpts] = useState({ trimLines: true, collapseSpaces: true, collapseBlank: true });
  const out = useMemo(() => cleanWhitespace(text, opts), [text, opts]);
  const t = (k: keyof typeof opts) => setOpts({ ...opts, [k]: !opts[k] });
  return (
    <div className="panel">
      <Area label="Messy text" value={text} onChange={setText} />
      <div className="btn-row">
        <label><input type="checkbox" checked={opts.trimLines} onChange={() => t('trimLines')} /> Trim line ends</label>
        <label><input type="checkbox" checked={opts.collapseSpaces} onChange={() => t('collapseSpaces')} /> Collapse multiple spaces</label>
        <label><input type="checkbox" checked={opts.collapseBlank} onChange={() => t('collapseBlank')} /> Collapse blank lines</label>
      </div>
      {text && <Out text={out} />}
    </div>
  );
}
export function DiffTool() {
  const [a, setA] = useState(''); const [b, setB] = useState('');
  const rows = useMemo(() => (a || b) ? diffLines(a, b) : [], [a, b]);
  const adds = rows.filter((r) => r.kind === 'add').length, dels = rows.filter((r) => r.kind === 'del').length;
  return (
    <div className="panel">
      <Area label="Original" value={a} onChange={setA} rows={6} />
      <Area label="Changed" value={b} onChange={setB} rows={6} />
      {rows.length > 0 && <>
        <p>+{adds} added, -{dels} removed.</p>
        <div className="output" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '.85rem' }}>
          {rows.map((r, i) => (
            <div key={i} style={{ background: r.kind === 'add' ? '#e6ffed' : r.kind === 'del' ? '#ffeef0' : 'transparent', color: r.kind === 'same' ? 'inherit' : undefined }}>
              {r.kind === 'add' ? '+ ' : r.kind === 'del' ? '- ' : '  '}{r.text}
            </div>))}
        </div>
      </>}
    </div>
  );
}
export function ReverseTool() {
  const [text, setText] = useState(''); const [mode, setMode] = useState<'chars' | 'words' | 'lines'>('chars');
  const out = useMemo(() => reverseText(text, mode), [text, mode]);
  return (
    <div className="panel">
      <Area label="Your text" value={text} onChange={setText} />
      <div className="btn-row">
        {([['chars', 'Reverse characters'], ['words', 'Reverse words'], ['lines', 'Reverse lines']] as const).map(([v, l]) =>
          <button key={v} className={mode === v ? '' : 'secondary'} onClick={() => setMode(v)}>{l}</button>)}
      </div>
      {text && <Out text={out} />}
    </div>
  );
}
export function FindReplaceTool() {
  const [text, setText] = useState(''); const [find, setFind] = useState(''); const [rep, setRep] = useState('');
  const [re, setRe] = useState(false); const [ic, setIc] = useState(false);
  const r = useMemo(() => {
    try { return findReplace(text, find, rep, re, ic); } catch { return { out: text, count: -1 }; }
  }, [text, find, rep, re, ic]);
  return (
    <div className="panel">
      <Area label="Your text" value={text} onChange={setText} />
      <div className="btn-row">
        <label>Find<br /><input type="text" value={find} onChange={(e) => setFind(e.target.value)} /></label>
        <label>Replace with<br /><input type="text" value={rep} onChange={(e) => setRep(e.target.value)} /></label>
      </div>
      <div className="btn-row">
        <label><input type="checkbox" checked={re} onChange={(e) => setRe(e.target.checked)} /> Regex</label>
        <label><input type="checkbox" checked={ic} onChange={(e) => setIc(e.target.checked)} /> Ignore case</label>
      </div>
      {r.count === -1 && <p style={{ color: '#c00' }}>Invalid regular expression.</p>}
      {find && r.count >= 0 && <p>{r.count} replacement{r.count === 1 ? '' : 's'}.</p>}
      {text && find && r.count >= 0 && <Out text={r.out} />}
    </div>
  );
}

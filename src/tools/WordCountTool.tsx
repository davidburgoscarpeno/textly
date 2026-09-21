import { useMemo, useState } from 'react';

export default function WordCountTool() {
  const [text, setText] = useState('');
  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+(\s|$)/g) || []).length || 1 : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).length : 0;
    const minutes = words / 200;
    const reading = words === 0 ? '-' : minutes < 1 ? `${Math.ceil(minutes * 60)} sec` : `${Math.floor(minutes)} min ${Math.round((minutes % 1) * 60)} sec`;
    return { words, chars, charsNoSpaces, sentences, paragraphs, reading };
  }, [text]);
  return (
    <div className="panel">
      <textarea rows={10} value={text} onChange={(e) => setText(e.target.value)} placeholder="Start typing or paste your text..." aria-label="Text to count" />
      <div className="tool-grid" style={{ marginTop: 12 }}>
        {[['Words', stats.words], ['Characters', stats.chars], ['No spaces', stats.charsNoSpaces], ['Sentences', stats.sentences], ['Paragraphs', stats.paragraphs], ['Reading time', stats.reading]].map(([label, v]) => (
          <div className="tool-card" key={label as string}><h3>{v}</h3><p>{label}</p></div>
        ))}
      </div>
    </div>
  );
}

export interface ToolFaq { q: string; a: string }
export interface ToolExample { title: string; input?: string; output?: string; note?: string }
export interface Tool {
  slug: string; name: string; category: string; description: string;
  seoTitle: string; metaDescription: string; intro: string;
  howTo: string[]; examples: ToolExample[]; faqs: ToolFaq[];
  related: string[]; component: string; mode?: string; implemented: boolean; popular?: boolean;
}
export const tools: Tool[] = [
  {
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'Counting',
    description: 'Count words, characters, sentences and paragraphs, with reading time.',
    seoTitle: 'Word Counter - Count Words and Characters Online Free | Textly',
    metaDescription: 'Free word counter: words, characters (with and without spaces), sentences, paragraphs and estimated reading time. Instant, private, in-browser.',
    intro: 'Paste or type any text and get live counts: words, characters, sentences, paragraphs and estimated reading time.',
    howTo: ['Paste or type your text.', 'Watch the counters update live.', 'Nothing is uploaded - counting happens in your browser.'],
    examples: [{ title: 'Quick check', input: 'The quick brown fox jumps over the lazy dog.', output: '9 words, 44 characters, 1 sentence.' }],
    faqs: [
      { q: 'What counts as a word?', a: 'Any run of characters separated by whitespace. Hyphenated words count as one.' },
      { q: 'How is reading time estimated?', a: 'Using an average adult reading speed of 200 words per minute.' }
    ],
    related: [],
    component: 'WordCountTool',
    implemented: true,
    popular: true
  }
];
export const implementedTools = tools.filter((t) => t.implemented);
export const categories = [...new Set(tools.map((t) => t.category))];
export function bySlug(slug: string) { return tools.find((t) => t.slug === slug); }

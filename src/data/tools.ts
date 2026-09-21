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
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    category: 'Convert',
    description: 'UPPERCASE, lowercase, Title Case, camelCase, snake_case and more.',
    seoTitle: 'Case Converter - UPPER, lower, Title, camelCase | Textly',
    metaDescription: 'Free case converter. Switch text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case and kebab-case.',
    intro: 'Convert text between nine cases instantly, from shouting UPPERCASE to developer-friendly camelCase and snake_case.',
    howTo: ['Paste your text.', 'Pick the target case.', 'Copy the result.'],
    examples: [{ title: 'hello world example', output: 'helloWorldExample (camelCase), hello_world_example (snake_case).' }],
    faqs: [{ q: 'Title Case vs Sentence case?', a: 'Title Case capitalizes every word; Sentence case only the first word of each sentence.' }],
    related: ['word-counter', 'find-and-replace', 'text-reverser'],
    component: 'CaseTool', implemented: true, popular: true
  },
  {
    slug: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    category: 'Clean',
    description: 'Deduplicate lines with optional case-insensitive matching.',
    seoTitle: 'Remove Duplicate Lines Online Free | Textly',
    metaDescription: 'Free duplicate line remover. Paste text and get each unique line once, keeping the original order. Case-insensitive option included.',
    intro: 'Clean lists in one click: every unique line kept once, in original order, with a count of what was removed.',
    howTo: ['Paste your list.', 'Optionally ignore case when comparing.', 'Copy the deduplicated result.'],
    examples: [{ title: 'Email list with repeats', output: 'Each address once; order preserved.' }],
    faqs: [{ q: 'Does it keep the first or last occurrence?', a: 'The first. Order is preserved, later duplicates are dropped.' }],
    related: ['sort-lines', 'whitespace-cleaner', 'find-and-replace'],
    component: 'DedupeTool', implemented: true, popular: true
  },
  {
    slug: 'sort-lines',
    name: 'Sort Lines',
    category: 'Organize',
    description: 'Sort lines alphabetically, by length or numerically.',
    seoTitle: 'Sort Lines Alphabetically Online Free | Textly',
    metaDescription: 'Free line sorter. Sort text lines A-Z, Z-A, by length or numerically. Instant and private - nothing leaves your browser.',
    intro: 'Sort any list: alphabetical, reverse, by line length, or numerically when lines start with numbers.',
    howTo: ['Paste your lines.', 'Choose the sort order.', 'Copy the sorted list.'],
    examples: [{ title: 'Shopping list', output: 'A to Z in one click.' }],
    faqs: [{ q: 'Numeric sort?', a: 'Lines are compared by their leading number, so "10 items" sorts after "9 items" as expected.' }],
    related: ['remove-duplicate-lines', 'text-reverser'],
    component: 'SortTool', implemented: true
  },
  {
    slug: 'whitespace-cleaner',
    name: 'Whitespace Cleaner',
    category: 'Clean',
    description: 'Trim line ends, collapse multiple spaces and extra blank lines.',
    seoTitle: 'Whitespace Cleaner - Remove Extra Spaces Online | Textly',
    metaDescription: 'Free whitespace cleaner. Trim trailing spaces, collapse repeated spaces and merge blank lines. Perfect after copying from PDFs.',
    intro: 'Text copied from PDFs and web pages arrives full of stray spaces and blank lines. Clean it in one pass.',
    howTo: ['Paste the messy text.', 'Toggle the cleanup steps.', 'Copy the clean version.'],
    examples: [{ title: 'PDF paste with double spaces', output: 'Single spaces, tidy paragraphs.' }],
    faqs: [{ q: 'Does it change words?', a: 'No. Only whitespace is touched - your text stays intact.' }],
    related: ['remove-duplicate-lines', 'case-converter'],
    component: 'WhitespaceTool', implemented: true
  },
  {
    slug: 'text-diff-checker',
    name: 'Text Diff Checker',
    category: 'Compare',
    description: 'Line-by-line comparison of two texts with additions and removals highlighted.',
    seoTitle: 'Text Diff Checker - Compare Two Texts Online | Textly',
    metaDescription: 'Free text diff checker. Compare two texts line by line with added and removed lines highlighted. Private: runs in your browser.',
    intro: 'What changed between two versions? Paste both texts and see added lines in green and removed lines in red.',
    howTo: ['Paste the original and the changed text.', 'Read the highlighted diff.', 'Lines marked + were added, - were removed.'],
    examples: [{ title: 'Two contract drafts', output: 'Every changed clause visible at a glance.' }],
    faqs: [{ q: 'Word-level diff?', a: 'This tool compares whole lines, which suits documents, lists and code.' }],
    related: ['find-and-replace', 'word-counter'],
    component: 'DiffTool', implemented: true, popular: true
  },
  {
    slug: 'text-reverser',
    name: 'Text Reverser',
    category: 'Convert',
    description: 'Reverse characters, words or lines.',
    seoTitle: 'Text Reverser - Reverse Characters, Words or Lines | Textly',
    metaDescription: 'Free text reverser. Flip text by characters, reverse word order or reverse line order instantly.',
    intro: 'Flip text three ways: every character backwards, word order reversed, or lines bottom-to-top.',
    howTo: ['Paste your text.', 'Choose characters, words or lines.', 'Copy the reversed result.'],
    examples: [{ title: 'hello world', output: 'dlrow olleh (characters), world hello (words).' }],
    faqs: [{ q: 'Unicode safe?', a: 'Yes - characters reverse by code point, so accents and emoji survive.' }],
    related: ['case-converter', 'sort-lines'],
    component: 'ReverseTool', implemented: true
  },
  {
    slug: 'find-and-replace',
    name: 'Find and Replace',
    category: 'Edit',
    description: 'Find and replace with plain text or regular expressions.',
    seoTitle: 'Find and Replace Text Online - Regex Support | Textly',
    metaDescription: 'Free find and replace tool. Replace text with plain matching or full regex support, case-insensitive option, and replacement count.',
    intro: 'Replace across your whole text at once, with plain text or regular expressions and a live count of replacements.',
    howTo: ['Paste your text.', 'Enter what to find and the replacement.', 'Toggle regex or ignore-case if needed, then copy the result.'],
    examples: [{ title: 'Normalize dates', input: 'Find: (\\d{2})/(\\d{2}) - Replace: $2-$1', output: 'Every 22/09 becomes 09-22.' }],
    faqs: [{ q: 'Regex groups?', a: 'Yes - use $1, $2 in the replacement to reference capture groups.' }],
    related: ['whitespace-cleaner', 'remove-duplicate-lines'],
    component: 'FindReplaceTool', implemented: true
  }
];
export const implementedTools = tools.filter((t) => t.implemented);
export const categories = [...new Set(tools.map((t) => t.category))];
export function bySlug(slug: string) { return tools.find((t) => t.slug === slug); }

import { describe, it, expect } from 'vitest';
import { toCase, dedupeLines, sortLines, cleanWhitespace, diffLines, reverseText, findReplace } from '../src/tools/textlib';
describe('case', () => {
  it('upper/lower/title', () => {
    expect(toCase('hello world', 'upper')).toBe('HELLO WORLD');
    expect(toCase('HELLO', 'lower')).toBe('hello');
    expect(toCase('hello world', 'title')).toBe('Hello World');
  });
  it('camel/pascal/snake/kebab', () => {
    expect(toCase('hello world example', 'camel')).toBe('helloWorldExample');
    expect(toCase('hello world', 'pascal')).toBe('HelloWorld');
    expect(toCase('Hello World', 'snake')).toBe('hello_world');
    expect(toCase('Hello World', 'kebab')).toBe('hello-world');
  });
  it('sentence case', () => expect(toCase('HELLO. BYE NOW.', 'sentence')).toBe('Hello. Bye now.'));
  it('inverse', () => expect(toCase('aBc', 'inverse')).toBe('AbC'));
});
describe('lines', () => {
  it('dedupe keeps first, counts removed', () => {
    const r = dedupeLines('a\nb\na\nc\nA', false);
    expect(r.out).toBe('a\nb\nc\nA'); expect(r.removed).toBe(1);
  });
  it('dedupe ignore case', () => expect(dedupeLines('a\nA', true).out).toBe('a'));
  it('sort az and numeric', () => {
    expect(sortLines('b\na\nc', 'az')).toBe('a\nb\nc');
    expect(sortLines('10 x\n9 x', 'numeric')).toBe('9 x\n10 x');
  });
  it('reverse modes', () => {
    expect(reverseText('abc', 'chars')).toBe('cba');
    expect(reverseText('one two', 'words')).toBe('two one');
    expect(reverseText('a\nb', 'lines')).toBe('b\na');
  });
});
describe('clean+diff+replace', () => {
  it('collapse spaces and blank lines', () => {
    expect(cleanWhitespace('a   b\n\n\n\nc', { trimLines: true, collapseSpaces: true, collapseBlank: true })).toBe('a b\n\nc');
  });
  it('diff marks add and del', () => {
    const rows = diffLines('a\nb\nc', 'a\nx\nc');
    expect(rows.map((r) => r.kind)).toEqual(['same', 'del', 'add', 'same']);
  });
  it('find replace plain and count', () => {
    const r = findReplace('foo bar foo', 'foo', 'baz', false, false);
    expect(r.out).toBe('baz bar baz'); expect(r.count).toBe(2);
  });
  it('find replace regex groups', () => {
    expect(findReplace('22/09', '(\\d+)/(\\d+)', '$2-$1', true, false).out).toBe('09-22');
  });
});

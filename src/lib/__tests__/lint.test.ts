import { lint } from '../lint';

describe('lint', () => {
  it('should return false if title or prefix is empty', () => {
    expect(lint('', 'prefix', true)).toBe(false);
    expect(lint('title', '', true)).toBe(false);
  });

  it('should handle case insensitivity correctly', () => {
    expect(lint('Title', 'title', false)).toBe(true);
    expect(lint('Title', 'Title', true)).toBe(true);
    expect(lint('Title', 'title', true)).toBe(false);
  });

  it('should return true if title starts with the prefix', () => {
    expect(lint('prefixTitle', 'prefix', true)).toBe(true);
    expect(lint('prefixTitle', 'prefix', false)).toBe(true);
  });

  it('should return false if title does not start with the prefix', () => {
    expect(lint('title', 'prefix', true)).toBe(false);
    expect(lint('title', 'prefix', false)).toBe(false);
  });

  it('should handle multiple prefixes separated by commas', () => {
    expect(lint('fix: something', 'fix,feat', true)).toBe(true);
    expect(lint('feat: something', 'fix,feat', true)).toBe(true);
    expect(lint('chore: something', 'fix,feat', true)).toBe(false);
  });

  it('should handle case insensitivity with multiple prefixes', () => {
    expect(lint('Fix: something', 'fix,feat', false)).toBe(true);
    expect(lint('Feat: something', 'fix,feat', false)).toBe(true);
    expect(lint('Chore: something', 'fix,feat', false)).toBe(false);
  });
});

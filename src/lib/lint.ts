export function lint(
  title: string,
  prefix: string,
  caseSensetive: boolean,
): boolean {
  if (!title || !prefix) {
    return false;
  }

  if (!caseSensetive) {
    title = title.toLowerCase();
    prefix = prefix.toLowerCase();
  }

  if (prefix.includes(',')) {
    const prefixes = prefix.split(',');
    for (const p of prefixes) {
      if (title.startsWith(p.trim())) {
        return true;
      }
    }
    return false;
  }

  return title.startsWith(prefix.trim());
}

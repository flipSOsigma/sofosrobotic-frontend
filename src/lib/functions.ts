export function truncateWords(text: string, charLimit: number = 50): string {
  const trimmed = text.trim();
  if (trimmed.length <= charLimit) return trimmed;
  return trimmed.slice(0, charLimit) + '...';
}

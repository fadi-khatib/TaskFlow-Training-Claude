export function sanitizeFeedback(text: string): string {
  return text.replace(/<[^>]+>/g, '').trim();
}

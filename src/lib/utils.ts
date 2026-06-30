export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9À-ſ\s]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
}

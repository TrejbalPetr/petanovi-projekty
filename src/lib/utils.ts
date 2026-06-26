export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9À-ſ\s]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

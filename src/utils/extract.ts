export function extractCSSProperty(css: string, property: string) {
  const regex = new RegExp(`${property}:\\s*(.*?)\\s*;`);
  const match = css.match(regex);
  return match ? match[1] : null;
}

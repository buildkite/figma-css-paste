export function extractCSSProperty(css: string, property: string) {
  const regex = new RegExp(`\\b${property}\\s*:\\s*(.*?)\\s*;`, "g");
  const match = regex.exec(css);
  return match ? match[1] : null;
}

export function parseCss(css: string): { [key: string]: string } {
  const properties = css
    .split(";")
    .map((prop) => prop.split(":").map((x) => x.trim()))
    .filter((prop) => prop.length >= 2);

  // Convert the properties into an object
  const cssObj: { [key: string]: string } = Object.fromEntries(properties);

  // Reorder the properties to ensure 'color' comes first
  const orderedCssObj: { [key: string]: string } = {};
  if (cssObj["color"]) {
    orderedCssObj["color"] = cssObj["color"];
    delete cssObj["color"];
  }
  return { ...orderedCssObj, ...cssObj };
}

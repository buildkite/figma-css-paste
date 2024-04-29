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
export interface ParsedNode {
  type: string;
  value: string;
  nodes: ParsedNode[];
  unit?: string;
}

export function parse(css: string) {
  // Match the function name and the argument string, accounting for nesting
  const functionMatch = css.match(/([\w-]+)\((.*)\)$/);
  if (!functionMatch) {
    console.error("Failed to parse CSS string:", css);
    return { type: "", value: "", nodes: [] };
  }

  const functionName = functionMatch[1];
  const args = functionMatch[2]; // Get all arguments as a single string

  // Split arguments considering nested structures (adjust regex to avoid splits inside color definitions)
  const argList = args.split(/,\s*(?![^()]*\))/g);

  return {
    type: "function",
    value: functionName,
    nodes: argList.map((arg) => parseSingleArgument(arg.trim())),
  };
}

function parseSingleArgument(arg: string) {
  // Check for the presence of nested functions like rgb/rgba
  const nestedFunctionMatch = arg.match(/([a-z]+)\(([^)]+)\)/i);
  if (nestedFunctionMatch) {
    const funcName = nestedFunctionMatch[1];
    const funcArgs = nestedFunctionMatch[2];
    const colors = funcArgs.split(",").map((num) => parseFloat(num.trim()));
    return {
      type: "function",
      value: funcName,
      nodes: colors.map((color) => ({
        type: "number",
        value: color,
        unit: "",
      })),
    };
  }

  const numValue = parseFloat(arg);
  if (!isNaN(numValue)) {
    return { type: "number", value: numValue, unit: "" };
  }

  return { type: "word", value: arg };
}

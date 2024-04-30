export function detectCSSColor(node: any) {
  if (node.value === "rgb") {
    return `rgb(${node.nodes.map((n: any) => n.value).join(", ")})`;
  } else {
    let colorRegEx = /((rgb|rgba|hsl|hsla)\(.*?\)|(#)?([0-9a-f]{3}){1,2}\b)/i;
    let colorMatch = node.value.match(colorRegEx);
    if (colorMatch) {
      return colorMatch[0];
    }
  }
  return null;
}

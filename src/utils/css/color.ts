import chroma from "chroma-js";

export function applyTextColor(node: any, color: string) {
  if (node.type === "TEXT") {
    const newFill = figma.util.solidPaint(chroma(color).hex());
    node.fills = [newFill];
  } else if ("children" in node) {
    node
      .findAll((n: any) => n.type === "TEXT")
      .forEach((textNode: any) => {
        const newFill = figma.util.solidPaint(chroma(color).hex());
        textNode.fills = [newFill];
      });
  }
}

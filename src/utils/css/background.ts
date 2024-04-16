import chroma from "chroma-js";

const fillableNodeTypes = [
  "RECTANGLE",
  "ELLIPSE",
  "POLYGON",
  "STAR",
  "VECTOR",
  "FRAME",
  "COMPONENT",
  "INSTANCE",
];

export function applyBackgroundColor(node: any, color: string) {
  if (node.type !== "TEXT" && fillableNodeTypes.includes(node.type)) {
    const newFill = figma.util.solidPaint(chroma(color).hex());
    node.fills = [newFill];
  }
}

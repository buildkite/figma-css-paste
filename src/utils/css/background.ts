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
  // Only apply to non-text nodes
  if (node.type !== "TEXT" && fillableNodeTypes.includes(node.type)) {
    const newFill = figma.util.solidPaint(color);
    node.fills = [newFill];
  }
}

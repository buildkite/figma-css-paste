export function applyTextColor(node: any, color: string) {
  // If the node is a text node, apply color
  if (node.type === "TEXT") {
    const newFill = figma.util.solidPaint(color);
    node.fills = [newFill];
  }
  // If the node has children, find text nodes and apply color
  else if ("children" in node) {
    node
      .findAll((n: any) => n.type === "TEXT")
      .forEach((textNode: any) => {
        const newFill = figma.util.solidPaint(color);
        textNode.fills = [newFill];
      });
  }
}

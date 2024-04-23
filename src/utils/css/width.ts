export function applyWidth(node: any, width: string) {
  const widthToApply = parseFloat(width);
  node.resize(widthToApply, node.height);
}

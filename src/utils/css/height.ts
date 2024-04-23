export function applyHeight(node: any, height: string) {
  const heightToApply = parseFloat(height);
  node.resize(node.width, heightToApply);
}

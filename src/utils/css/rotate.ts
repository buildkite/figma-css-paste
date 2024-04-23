export function applyRotate(node: any, rotation: string) {
  const degree = parseFloat(rotation.replace("deg", ""));
  node.rotation = degree;
}

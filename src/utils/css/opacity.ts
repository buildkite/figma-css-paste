export function applyOpacity(node: any, opacity: string) {
  const opacityToApply = parseFloat(opacity);

  if (opacityToApply >= 0 && opacityToApply <= 1) {
    node.opacity = opacityToApply;
  } else {
    throw new Error("Opacity must be a value between 0 and 1");
  }
}

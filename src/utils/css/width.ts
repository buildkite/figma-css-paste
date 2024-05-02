export function applyWidth(node: any, width: string) {
  if (width.toLowerCase() === "auto") {
    node.layoutGrow = 1;
  } else {
    let widthToApply = parseFloat(width);
    widthToApply = Math.round(widthToApply);

    if (!isNaN(widthToApply) && widthToApply >= 0.01) {
      node.resize(widthToApply, node.height);
    } else {
      console.error("Invalid width value: ", width);
    }
  }
}

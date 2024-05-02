export function applyHeight(node: any, height: string) {
  if (height.toLowerCase() === "auto") {
    node.layoutGrow = 1;
  } else {
    let heightToApply = parseFloat(height);
    heightToApply = Math.round(heightToApply);

    if (!isNaN(heightToApply) && heightToApply >= 0.01) {
      node.resize(node.width, heightToApply);
    } else {
      console.error("Invalid height value: ", height);
    }
  }
}

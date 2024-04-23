export function parsePadding(padding: string) {
  // split by space and convert to numbers
  return padding.split(" ").map(parseFloat);
}

export function applyPadding(node: any, paddingValues: number[]) {
  let padding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  if (paddingValues.length === 1) {
    padding.top =
      padding.right =
      padding.bottom =
      padding.left =
        paddingValues[0];
  } else if (paddingValues.length === 2) {
    padding.top = padding.bottom = paddingValues[0];
    padding.right = padding.left = paddingValues[1];
  } else if (paddingValues.length === 3) {
    padding.top = paddingValues[0];
    padding.right = padding.left = paddingValues[1];
    padding.bottom = paddingValues[2];
  } else if (paddingValues.length === 4) {
    padding.top = paddingValues[0];
    padding.right = paddingValues[1];
    padding.bottom = paddingValues[2];
    padding.left = paddingValues[3];
  }

  if (node.layoutMode !== "NONE") {
    node.paddingTop = padding.top;
    node.paddingRight = padding.right;
    node.paddingBottom = padding.bottom;
    node.paddingLeft = padding.left;
  }
}

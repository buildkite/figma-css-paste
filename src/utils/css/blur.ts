export function applyBlur(node: any, blur: string) {
  // extract the blur value between parentheses
  const matches = blur.match(/blur\((.*?)px\)/);
  let blurValue;

  if (matches) {
    blurValue = parseFloat(matches[1]);
  } else {
    throw new Error("Invalid blur value");
  }

  if (isNaN(blurValue)) {
    throw new Error("Blur value is not a number");
  }

  // ensure it's a valid blur value, or set to maximum acceptable limit
  if (blurValue > 100) {
    blurValue = 100;
  } else if (blurValue < 0) {
    throw new Error("Blur value must be 0 or greater");
  }

  node.effects = [
    ...node.effects,
    {
      type: "LAYER_BLUR",
      radius: blurValue,
      visible: true,
    },
  ];
}

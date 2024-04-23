export function applyFilterBlur(node: any, blur: string) {
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

  // Remove background blur effect
  let newEffects = node.effects.filter(
    (effect) => effect.type !== "BACKGROUND_BLUR"
  );

  // Add the filter (layer) blur effect
  newEffects.push({
    type: "LAYER_BLUR",
    radius: blurValue,
    visible: true,
  });

  node.effects = newEffects;
}

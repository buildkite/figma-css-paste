export function applyMixBlendMode(node: any, blendMode: string) {
  const allowedBlendModes = [
    "PASS_THROUGH",
    "NORMAL",
    "DARKEN",
    "MULTIPLY",
    "LINEAR_BURN",
    "COLOR_BURN",
    "LIGHTEN",
    "SCREEN",
    "LINEAR_DODGE",
    "COLOR_DODGE",
    "OVERLAY",
    "SOFT_LIGHT",
    "HARD_LIGHT",
    "DIFFERENCE",
    "EXCLUSION",
    "HUE",
    "SATURATION",
    "COLOR",
    "LUMINOSITY",
  ];

  if (!blendMode) {
    console.error("No blend mode provided");
    return;
  }

  let upperCaseBlendMode = blendMode.toUpperCase();
  if (allowedBlendModes.includes(upperCaseBlendMode)) {
    node.blendMode = upperCaseBlendMode;
  } else {
    console.error(`Invalid blend mode: ${blendMode}`);
  }
}

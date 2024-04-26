import chroma from "chroma-js";

type TextShadow = {
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  color: string;
};

function parseValue(shadow: string): TextShadow[] {
  // Split individual shadows
  const shadows = shadow.split(/,(?![^\(]*\))/).map((shadow) => shadow.trim());

  // Iterate through each shadow
  return shadows.map((shadow) => {
    const parts = shadow.split(" ");
    const values = parts.filter((part) => !isNaN(parseFloat(part)));
    const colors = parts.filter((part) => isNaN(parseFloat(part)));

    return {
      offsetX: parseFloat(values[0]),
      offsetY: parseFloat(values[1]),
      blurRadius: parseFloat(values[2] || 0),
      color: colors[0] || "black", // Defaults to black
    };
  });
}

export function parseTextShadow(textShadow: string): DropShadowEffect[] {
  const shadowValues = parseValue(textShadow);
  const effects: DropShadowEffect[] = [];

  shadowValues.forEach((shadowValue) => {
    const convertedColor = chroma.valid(shadowValue.color)
      ? chroma(shadowValue.color).gl()
      : [0, 0, 0, 1]; // Defaults to black if color is invalid

    const effect: DropShadowEffect = {
      type: "DROP_SHADOW",
      color: {
        r: convertedColor[0],
        g: convertedColor[1],
        b: convertedColor[2],
        a: convertedColor[3],
      },
      blendMode: "NORMAL",
      offset: {
        x: shadowValue.offsetX,
        y: shadowValue.offsetY,
      },
      radius: shadowValue.blurRadius,
      spread: 0,
      visible: true,
    };

    effects.push(effect);
  });

  return effects.reverse();
}

export function applyTextShadow(node: TextNode, effects: DropShadowEffect[]) {
  // Check if node is TextNode
  if (node.type === "TEXT") {
    const existingEffects = node.effects.filter(
      (effect: Effect) => effect.type !== "DROP_SHADOW"
    );

    node.effects = [...existingEffects, ...effects];
  }
}

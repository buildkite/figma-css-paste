import chroma from "chroma-js";

type BoxShadow = {
  inset: boolean;
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  spreadRadius: number;
  color: string;
};

function parseValue(shadow: string): BoxShadow[] {
  // Regular expression for matching color values
  const colorRegEx = /((rgb|rgba|hsl|hsla)\(.*?\))|((#)?([0-9a-f]{3}){1,2}\b)/i;

  // Separate individual shadows
  const shadows = shadow.split(/,(?![^\(]*\))/);

  // Iterate through the shadows and parse them
  return shadows.map((item) => {
    // Default box-shadow object
    const boxShadow: BoxShadow = {
      inset: false,
      offsetX: 0,
      offsetY: 0,
      blurRadius: 0,
      spreadRadius: 0,
      color: "",
    };

    // Check if color is defined
    const colorMatch = item.match(colorRegEx);
    if (colorMatch) {
      boxShadow.color = colorMatch[0];
      item = item.replace(colorMatch[0], "").trim(); // Remove color from item
    }

    // Split remaining properties
    const properties = item.split(" ").filter((prop) => prop.trim() !== "");

    if (properties[0].toLowerCase() == "inset") {
      boxShadow.inset = true;
      properties.shift(); // Remove 'inset'
    }

    if (properties.length) boxShadow.offsetX = parseFloat(properties[0]);
    if (properties.length > 1) boxShadow.offsetY = parseFloat(properties[1]);
    if (properties.length > 2) boxShadow.blurRadius = parseFloat(properties[2]);
    if (properties.length > 3)
      boxShadow.spreadRadius = parseFloat(properties[3]);

    return boxShadow;
  });
}

export function parseInnerShadow(boxShadow: string): InnerShadowEffect[] {
  const shadowValues = parseValue(boxShadow);
  const effects: InnerShadowEffect[] = [];

  shadowValues
    .filter((boxValue) => boxValue.inset)
    .forEach((boxValue) => {
      const convertedColor = chroma.valid(boxValue.color)
        ? chroma(boxValue.color).gl()
        : [0, 0, 0, 1]; // Default to black if color is invalid

      const effect: InnerShadowEffect = {
        type: "INNER_SHADOW",
        color: {
          r: convertedColor[0],
          g: convertedColor[1],
          b: convertedColor[2],
          a: convertedColor[3],
        },
        blendMode: "NORMAL",
        offset: {
          x: boxValue.offsetX,
          y: boxValue.offsetY,
        },
        radius: boxValue.blurRadius,
        spread: boxValue.spreadRadius,
        visible: true,
      };

      effects.push(effect);
    });

  return effects.reverse();
}

export function parseDropShadow(boxShadow: string): DropShadowEffect[] {
  const shadowValues = parseValue(boxShadow);
  const effects: DropShadowEffect[] = [];

  shadowValues
    .filter((boxValue) => !boxValue.inset)
    .forEach((boxValue) => {
      const convertedColor = chroma.valid(boxValue.color)
        ? chroma(boxValue.color).gl()
        : [0, 0, 0, 1]; // Default to black if color is invalid

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
          x: boxValue.offsetX,
          y: boxValue.offsetY,
        },
        radius: boxValue.blurRadius,
        spread: boxValue.spreadRadius,
        visible: true,
      };

      effects.push(effect);
    });

  return effects.reverse();
}

export function applyInnerShadow(node: BaseNode, effects: InnerShadowEffect[]) {
  if ("effects" in node) {
    const existingEffects = node.effects.filter(
      (effect: Effect) => effect.type !== "INNER_SHADOW"
    );

    node.effects = [...existingEffects, ...effects];
  }
}

export function applyDropShadow(node: BaseNode, effects: DropShadowEffect[]) {
  if ("effects" in node) {
    const existingEffects = node.effects.filter(
      (effect: Effect) => effect.type !== "DROP_SHADOW"
    );

    node.effects = [...existingEffects, ...effects];
  }
}

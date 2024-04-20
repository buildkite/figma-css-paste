import chroma from "chroma-js";
import { applyProperty } from "../applyStyles";

type Style = "solid" | "dashed" | "dotted";

function applyBorderShorthand(
  node: GeometryMixin,
  width: string,
  style: Style,
  color: string
) {
  const numericWidth = parseFloat(width);

  applyProperty(node, "strokes", [figma.util.solidPaint(chroma(color).hex())]);
  applyProperty(node, "strokeWeight", numericWidth);

  const styles: Record<
    Style | "default",
    { miterLimit?: number; dashPattern: number[] }
  > = {
    solid: {
      miterLimit: 4,
      dashPattern: [],
    },
    dashed: {
      dashPattern: [numericWidth * 2, numericWidth * 2],
    },
    dotted: {
      dashPattern: [numericWidth, numericWidth],
    },
    default: {
      dashPattern: [],
    },
  };

  node.strokeMiterLimit = styles[style]?.miterLimit || 4;
  applyProperty(
    node,
    "dashPattern",
    styles[style]?.dashPattern || styles.default.dashPattern
  );
}

function applyStrokeColor(node: any, color: string) {
  applyProperty(node, "strokes", [figma.util.solidPaint(chroma(color).hex())]);
}

function applyStrokeWidth(node: GeometryMixin, width: string) {
  applyProperty(node, "strokeWeight", parseFloat(width));
}

function applyStrokeStyle(node: any, style: Style) {
  const styles: Record<
    Style | "default",
    { miterLimit?: number; dashPattern: number[] }
  > = {
    solid: { miterLimit: 4, dashPattern: [] },
    dashed: { dashPattern: [node.strokeWeight * 2, node.strokeWeight * 2] },
    dotted: { dashPattern: [node.strokeWeight, node.strokeWeight] },
    default: { dashPattern: [] },
  };

  if (style in styles) {
    node.strokeMiterLimit = styles[style].miterLimit || 4;
    applyProperty(node, "dashPattern", styles[style].dashPattern);
  }
}

export {
  applyStrokeColor as applyBorderColor,
  applyStrokeWidth as applyBorderWidth,
  applyStrokeStyle as applyBorderStyle,
  applyBorderShorthand,
};

export function parseBorderProperty(
  border: string
): [string, string, string] | undefined {
  const properties = border.split(" ");

  // Make sure three values are provided
  if (properties.length === 3) {
    const width = properties[0];
    const style = properties[1];
    const color = properties[2];

    // Validate the properties - this is a basic validation and can be extended
    if (
      !isNaN(parseFloat(width)) &&
      ["solid", "dashed", "dotted"].includes(style) &&
      /^#([0-9a-f]{3}){1,2}$/i.test(color)
    ) {
      return [width, style, color];
    }
  }

  return undefined;
}

export function applyLeftStrokeWidth(node: GeometryMixin, width: string) {
  applyProperty(node, "strokeLeftWeight", parseFloat(width));
}
export function applyRightStrokeWidth(node: GeometryMixin, width: string) {
  applyProperty(node, "strokeRightWeight", parseFloat(width));
}
export function applyBottomStrokeWidth(node: GeometryMixin, width: string) {
  applyProperty(node, "strokeBottomWeight", parseFloat(width));
}
export function applyTopStrokeWidth(node: GeometryMixin, width: string) {
  applyProperty(node, "strokeTopWeight", parseFloat(width));
}

export function applyLeftStrokeColor(node: any, color: string) {
  applyProperty(node, "strokes", [figma.util.solidPaint(chroma(color).hex())]);
}
export function applyRightStrokeColor(node: any, color: string) {
  applyProperty(node, "strokes", [figma.util.solidPaint(chroma(color).hex())]);
}
export function applyTopStrokeColor(node: any, color: string) {
  applyProperty(node, "strokes", [figma.util.solidPaint(chroma(color).hex())]);
}
export function applyBottomStrokeColor(node: any, color: string) {
  applyProperty(node, "strokes", [figma.util.solidPaint(chroma(color).hex())]);
}

import chroma from "chroma-js";

type ModifiableGeometryMixin = Omit<
  GeometryMixin,
  "fillGeometry" | "strokeGeometry"
>;

function applyProperty(
  node: ModifiableGeometryMixin,
  property: keyof ModifiableGeometryMixin,
  value: any
) {
  if (node && property in node) {
    (node as any)[property] = value;
  }
}

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

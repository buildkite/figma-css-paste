import { extractCSSProperty } from "./extractStyles";

type StylerFunction = (node: BaseNodeMixin, ...values: any[]) => void;

type ModifiableGeometryMixin = Omit<
  GeometryMixin,
  "fillGeometry" | "strokeGeometry"
>;

export function applyStylerToSelection(
  css: string,
  property: string,
  styler: StylerFunction,
  propertyParser?: (value: string) => any
) {
  let propValue = extractCSSProperty(css, property);

  if (propValue !== "" && propValue !== null) {
    const parsedPropValues = propertyParser
      ? propertyParser(propValue)
      : propValue;
    const selectedNodes = figma.currentPage.selection;
    selectedNodes.forEach((node) => styler(node, parsedPropValues));
  }
}

export function applyProperty(
  node: ModifiableGeometryMixin,
  property: keyof ModifiableGeometryMixin,
  value: any
) {
  if (node && property in node) {
    (node as any)[property] = value;
  }
}

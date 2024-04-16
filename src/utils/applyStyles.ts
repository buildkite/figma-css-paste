import { extractCSSProperty } from "./extractStyles";

type StylerFunction = (node: BaseNodeMixin, ...values: any[]) => void;

export function applyStylerToSelection(
  css: string,
  property: string,
  styler: StylerFunction,
  propertyParser?: (value: string) => any
) {
  let propValue = extractCSSProperty(css, property);

  if (propValue !== "" && propValue !== null) {
    const parsedPropValue = propertyParser
      ? propertyParser(propValue)
      : propValue;
    const selectedNodes = figma.currentPage.selection;
    selectedNodes.forEach((node) =>
      styler(node, ...[].concat(parsedPropValue))
    );
  }
}

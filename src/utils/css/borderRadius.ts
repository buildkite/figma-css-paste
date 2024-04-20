import { applyProperty } from "../applyStyles";

export function applyBorderRadius(node: GeometryMixin, width: string) {
  applyProperty(node, "cornerRadius", parseFloat(width));
}

export function applyBorderTopLeftRadius(node: GeometryMixin, width: string) {
  applyProperty(node, "topLeftRadius", parseFloat(width));
}

export function applyBorderTopRightRadius(node: GeometryMixin, width: string) {
  applyProperty(node, "topRightRadius", parseFloat(width));
}

export function applyBorderBottomLeftRadius(
  node: GeometryMixin,
  width: string
) {
  applyProperty(node, "bottomLeftRadius", parseFloat(width));
}

export function applyBorderBottomRightRadius(
  node: GeometryMixin,
  width: string
) {
  applyProperty(node, "bottomRightRadius", parseFloat(width));
}

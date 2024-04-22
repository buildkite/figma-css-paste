import { applyProperty } from "../applyStyles";

type BorderRadius = {
  topLeftRadius: number;
  topRightRadius: number;
  bottomLeftRadius: number;
  bottomRightRadius: number;
};

function parseBorderRadius(radius: string): BorderRadius {
  // Split the provided radius string into a list of corner radius values
  const properties = radius
    .split(" ")
    .filter((prop: string) => prop.trim() !== "");

  // Initialize borderRadius with 0 values. Provide fallback values for each corner radius.
  const borderRadius: BorderRadius = {
    topLeftRadius: 0,
    topRightRadius: 0,
    bottomRightRadius: 0,
    bottomLeftRadius: 0,
  };

  // Assign values based on the input, considering that CSS allows 1 to 4 values.
  switch (properties.length) {
    case 1:
      borderRadius.topLeftRadius =
        borderRadius.topRightRadius =
        borderRadius.bottomRightRadius =
        borderRadius.bottomLeftRadius =
          parseFloat(properties[0]);
      break;
    case 2:
      borderRadius.topLeftRadius = borderRadius.bottomRightRadius = parseFloat(
        properties[0]
      );
      borderRadius.topRightRadius = borderRadius.bottomLeftRadius = parseFloat(
        properties[1]
      );
      break;
    case 3:
      borderRadius.topLeftRadius = parseFloat(properties[0]);
      borderRadius.topRightRadius = borderRadius.bottomLeftRadius = parseFloat(
        properties[1]
      );
      borderRadius.bottomRightRadius = parseFloat(properties[2]);
      break;
    case 4:
      borderRadius.topLeftRadius = parseFloat(properties[0]);
      borderRadius.topRightRadius = parseFloat(properties[1]);
      borderRadius.bottomRightRadius = parseFloat(properties[2]);
      borderRadius.bottomLeftRadius = parseFloat(properties[3]);
      break;
    default:
      console.error("Invalid border radius value");
      break;
  }
  return borderRadius;
}

export function applyBorderRadius(node: GeometryMixin, radius: string) {
  const borderRadius = parseBorderRadius(radius);

  applyProperty(node, "topLeftRadius", borderRadius.topLeftRadius);
  applyProperty(node, "topRightRadius", borderRadius.topRightRadius);
  applyProperty(node, "bottomLeftRadius", borderRadius.bottomLeftRadius);
  applyProperty(node, "bottomRightRadius", borderRadius.bottomRightRadius);
}

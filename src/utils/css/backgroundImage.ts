import {
  GradientNode,
  parseGradient,
  ColorStop,
  RgbaColor,
} from "../parsers/gradientParser";

function rgbaToFigmaRgba([r, g, b, a]: RgbaColor): RGBA {
  return { r: r / 255.0, g: g / 255.0, b: b / 255.0, a: a };
}

/**
 * Calculates GradientPaints for a css gradient value given to <image> values like `background-image:` and `background:`
 * W3C specs: https://www.w3.org/TR/css-images-4/#gradients and https://www.w3.org/TR/css-images-3/#gradients
 *
 * @param css raw gradient text
 * @param width
 * @param height
 * @returns GradientPaints in order of painting (reverse order of appearance in css) - this is important to let figma
 * properly blend the gradients
 */

type GradientPaint = {
  type:
    | "GRADIENT_LINEAR"
    | "GRADIENT_RADIAL"
    | "GRADIENT_ANGULAR"
    | "GRADIENT_DIAMOND";
  gradientTransform: number[][];
  gradientStops: { color: RGBA; position: number }[];
};

export function applyBackgroundImage(node: any, gradientCss: string) {
  const gradients = cssToFigmaGradients(gradientCss);

  node.fills = gradients.map((gradient) => ({
    type: gradient.type,
    gradientTransform: gradient.gradientTransform,
    gradientStops: gradient.gradientStops.map((stop) => ({
      color: stop.color,
      position: stop.position, // Ensure this exists, or provide a default
    })),
  }));

  console.log("Node Fills Set:", node.fills);
}

function cssToFigmaGradients(css: string): GradientPaint[] {
  console.log("Converting CSS to Figma gradients", css);

  const parsedGradients = parseGradient(css);
  if (!parsedGradients.length) {
    console.warn("No gradients parsed from CSS.");
    return [];
  }

  // Assuming you are attempting to map or invoke further transformations on parsed gradients
  return parsedGradients.map((parsedGradient) => {
    console.log("Processing Gradient:", parsedGradient);
    return convertParsedGradientToFigmaGradient(
      parsedGradient,
      parsedGradients.length
    );
  });
}

function convertParsedGradientToFigmaGradient(
  parsedGradient: GradientNode,
  gradientLength: number
): GradientPaint {
  // Check for structural anomalies
  if (typeof parsedGradient !== "object" || !parsedGradient.type) {
    console.error("Invalid gradient data encountered", parsedGradient);
    throw new Error("Invalid gradient data provided.");
  }

  const stopAmounts = parsedGradient.colorStops.length;

  // Convert colors and calculate transforms
  const figmaGradient: GradientPaint = {
    type: getFigmaGradientType(parsedGradient.type),
    gradientTransform: composeTransform(parsedGradient.angle || 0),
    gradientStops: parsedGradient.colorStops.map(
      (stop: any, index: number) => ({
        color: convertColorToRGBA(stop.color),
        position: getPosition(stop.color, index, stopAmounts, gradientLength), // Ensure this exists, or provide a default
      })
    ),
  };

  return figmaGradient;
}

// Helper functions:
function getFigmaGradientType(cssType: string): string {
  switch (cssType) {
    case "linear-gradient":
      return "GRADIENT_LINEAR";
    case "radial-gradient":
      return "GRADIENT_RADIAL";
    default:
      return "GRADIENT_UNKNOWN"; // Handle unknown or unsupported types
  }
}

// Function to compose a transformation matrix in Figma from an angle in degrees
function composeTransform(angle: number): {
  [key: number]: { [key: number]: number };
} {
  const radians = (angle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  return {
    0: { 0: cos, 1: -sin, 2: 0 },
    1: { 0: sin, 1: cos, 2: 0 },
  };
}

// Function to convert CSS color strings to Figma's RGBA format
function convertColorToRGBA(color: string): RGBA {
  // Strip out the leading 'rgb' or 'rgba' and the parentheses, split by commas
  const colorParts = color.match(/\d+/g); // Matches consecutive digits in the color string

  // Initialize alpha to 1 for opaque colors by default
  let r = parseInt(colorParts[0]) / 255;
  let g = parseInt(colorParts[1]) / 255;
  let b = parseInt(colorParts[2]) / 255;
  let a = colorParts.length > 3 ? parseFloat(colorParts[3]) : 1;

  return { r, g, b, a };
}

function getPosition(
  stop: ColorStop,
  index: number,
  total: number,
  gradientLength: number,
  previousPosition = 0
): number {
  if (total <= 1) return 0;
  // browsers will enforce increasing positions (red 50%, blue 0px) becomes (red 50%, blue 50%)
  const normalize = (v: number) => Math.max(previousPosition, Math.min(1, v));
  if (stop.position) {
    if (stop.position.value <= 0) {
      return normalize(0);
    }
    switch (stop.position.unit) {
      case "%":
        return normalize(stop.position.value / 100);
      case "px":
        return normalize(stop.position.value / gradientLength);
      default:
        console.warn("Unsupported stop position unit: ", stop.position.unit);
    }
  }

  console.log("Color stop:", stop);
  console.log("Color index:", index);
  console.log("Color stop total:", total);
  console.log("Gradient length:", gradientLength);

  return normalize(index / (total - 1));
}

function calculateRotationAngle(parsedGradient: GradientNode): number {
  // CSS has a top-down default, figma has a right-left default when no angle is specified
  // CSS has a default unspecified angle of 180deg, figma has a default unspecified angle of 0deg
  const initialRotation = -Math.PI / 2.0; // math rotation with css 180deg default
  let additionalRotation = 0.0;

  // linear gradients
  if (
    parsedGradient.type === "linear-gradient" ||
    parsedGradient.type === "repeating-linear-gradient"
  ) {
    if (parsedGradient.gradientLine.type === "side-or-corner") {
      switch (parsedGradient.gradientLine.value) {
        case "left":
          additionalRotation = -90;
          break;
        case "right":
          additionalRotation = 90;
          break;
        case "bottom":
          additionalRotation = 0;
          break;
        case "top":
          additionalRotation = 180;
          break;
        case "left top":
        case "top left":
          additionalRotation = -135;
          break;
        case "right top":
        case "top right":
          additionalRotation = 135;
          break;
        case "left bottom":
        case "bottom left":
          additionalRotation = -45;
          break;
        case "right bottom":
        case "bottom right":
          additionalRotation = 45;
          break;
        default:
          throw "unsupported linear gradient orientation";
      }
    } else {
      // css angle is clockwise from the y-axis, figma angles are counter-clockwise from the x-axis
      additionalRotation =
        (convertCssAngle(parsedGradient.gradientLine.value) + 90) % 360;
      console.log(
        "parsed angle",
        parsedGradient.gradientLine.value,
        convertCssAngle(parsedGradient.gradientLine.value),
        additionalRotation
      );
      return degreesToRadians(additionalRotation);
    }
  } else if (parsedGradient.type === "radial-gradient") {
    // if size is 'furthers-corner' which is the default, then the rotation is 45 to reach corner
    // any corner will do, but we will use the bottom right corner
    // since the parser is not smart enough to know that, we just assume that for now
    additionalRotation = 45;
  }

  return initialRotation + degreesToRadians(additionalRotation);
}

type FigmaAngle = number; // 0-360, CCW from x-axis
type CssAngle = number; // 0-360, CW from y-axis

function convertCssAngle(angle: CssAngle): FigmaAngle {
  // positive angles only
  angle = angle < 0 ? 360 + angle : angle;
  // convert to CCW angle use by figma
  angle = 360 - angle;
  return angle % 360;
}

function calculateLength(
  parsedGradient: GradientNode,
  width: number,
  height: number
): number {
  if (
    parsedGradient.type === "linear-gradient" ||
    parsedGradient.type === "repeating-linear-gradient"
  ) {
    if (parsedGradient.gradientLine.type === "side-or-corner") {
      switch (parsedGradient.gradientLine.value) {
        case "left":
        case "right":
          return width;
        case "bottom":
        case "top":
          return height;
        case "left top":
        case "top left":
        case "right top":
        case "top right":
        case "left bottom":
        case "bottom left":
        case "right bottom":
        case "bottom right":
          return Math.sqrt(width ^ (2 + height) ^ 2);
        default:
          throw "unsupported linear gradient orientation";
      }
    } else if (parsedGradient.gradientLine.type === "angle") {
      // from w3c: abs(W * sin(A)) + abs(H * cos(A))
      // https://w3c.github.io/csswg-drafts/css-images-3/#linear-gradients
      const rads = degreesToRadians(
        convertCssAngle(parsedGradient.gradientLine.value)
      );
      return (
        Math.abs(width * Math.sin(rads)) + Math.abs(height * Math.cos(rads))
      );
    } else if (!parsedGradient.gradientLine) {
      return height; // default to bottom
    }
  } else if (parsedGradient.type === "radial-gradient") {
    // if size is 'furthers-corner' which is the default, then the scale is sqrt(2)
    // since the parser is not smart enough to know that, we just assume that for now
    return Math.sqrt(2);
  }
  throw "unsupported gradient type";
}

function calculateScale(parsedGradient: GradientNode): [number, number] {
  if (
    parsedGradient.type === "linear-gradient" ||
    parsedGradient.type === "repeating-linear-gradient"
  ) {
    if (parsedGradient.gradientLine.type === "side-or-corner") {
      switch (parsedGradient.gradientLine.value) {
        case "left":
        case "right":
        case "bottom":
        case "top":
          return [1.0, 1.0];
        case "left top":
        case "top left":
        case "right top":
        case "top right":
        case "left bottom":
        case "bottom left":
        case "right bottom":
        case "bottom right":
          const scale = 1 / Math.sqrt(2);
          return [scale, 1.0];
        default:
          throw "unsupported linear gradient orientation";
      }
    } else if (parsedGradient.gradientLine.type === "angle") {
      // from w3c: abs(W * sin(A)) + abs(H * cos(A))
      // https://w3c.github.io/csswg-drafts/css-images-3/#linear-gradients
      // W and H are unit vectors, so we can just use 1
      const scale =
        Math.abs(
          Math.sin(
            degreesToRadians(convertCssAngle(parsedGradient.gradientLine.value))
          )
        ) +
        Math.abs(
          Math.cos(
            degreesToRadians(convertCssAngle(parsedGradient.gradientLine.value))
          )
        );

      return [1.0 / scale, 1.0 / scale];
    }
  } else if (parsedGradient.type === "radial-gradient") {
    // if size is 'furthers-corner' which is the default, then the scale is sqrt(2)
    // since the parser is not smart enough to know that, we just assume that for now
    const scale = 1 / Math.sqrt(2);
    return [scale, scale];
  }

  return [1.0, 1.0];
}

function calculateTranslationToCenter(
  parsedGradient: GradientNode
): [number, number] {
  if (
    parsedGradient.type === "linear-gradient" ||
    parsedGradient.type === "repeating-linear-gradient"
  ) {
    if (parsedGradient.gradientLine.type === "side-or-corner") {
      switch (parsedGradient.gradientLine.value) {
        case "left":
          return [-1, -0.5];
        case "right":
          return [0, -0.5];
        case "bottom":
          return [-0.5, 0];
        case "top":
          return [-0.5, -1];
        case "left top":
        case "top left":
          return [-1, -1];
        case "right top":
        case "top right":
          return [0, -1];
        case "left bottom":
        case "bottom left":
          return [-1, 0];
        case "right bottom":
        case "bottom right":
          return [0, 0];
        default:
          throw "unsupported linear gradient orientation";
      }
    } else if (parsedGradient.gradientLine.type === "angle") {
      const angle = convertCssAngle(parsedGradient.gradientLine.value);
      if (angle === 0) {
        return [-0.5, -1];
      } else if (angle === 90) {
        return [-1, -0.5];
      } else if (angle === 180) {
        return [-0.5, 0];
      } else if (angle === 270) {
        return [0, -0.5];
      } else if (angle > 0 && angle < 90) {
        return [-1, -1];
      } else if (angle > 90 && angle < 180) {
        return [-1, 0];
      } else if (angle > 180 && angle < 270) {
        return [0, 0];
      } else if (angle > 270 && angle < 360) {
        return [0, -1];
      }
    } else if (
      parsedGradient.type === "linear-gradient" &&
      !parsedGradient.gradientLine
    ) {
      return [-0.5, 0]; // default to bottom
    }
  } else if (parsedGradient.type === "radial-gradient") {
    if (parsedGradient.position === "center") {
      return [0, 0];
    }

    return [0, 0];
  }

  return [0, 0];
}

function degreesToRadians(degrees: number) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

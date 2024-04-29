import chroma from "chroma-js";
import { parse } from "@/utils/extractStyles";
import { stringify } from "@/utils/stringify";
import { unit } from "@/utils/units";

export type GradientTypes = LinearGradient[] | RadialGradient | ConicGradient;

interface GradientNode {
  type: GradientTypes;
  nodes: FunctionNode[];
}

interface FunctionNode {
  value: string;
  nodes: any[]; // Would ideally have more precise typing based on the expected structure.
}

export interface SideOrCornerGradientLine {
  type: "side-or-corner";
  value:
    | "left"
    | "top"
    | "bottom"
    | "right"
    | "left top"
    | "top left"
    | "left bottom"
    | "bottom left"
    | "right top"
    | "top right"
    | "right bottom"
    | "bottom right";
}

export type GradientType =
  | "linear-gradient"
  | "repeating-linear-gradient"
  | "radial-gradient"
  | "repeating-radial-gradient"
  | "conic-gradient";

export type AngleGradientLine = {
  type: "angle";
  // Normalized to degrees
  value: number;
};

export type Length = {
  value: number;
  unit: string;
};

export type ColorStopList = ColorStopListItem[];
export type ColorStopListItem = ColorStop | ColorHint | AngularColorStop;
export type RgbaColor = [number, number, number, number];

export type ColorStop = {
  type: "color-stop";
  rgba: RgbaColor;
  position?: Length;
};

export type AngularColorStop = {
  type: "angular-color-stop";
  rgba: RgbaColor;
  angle?: Length | [Length, Length];
};

export type ColorHint = {
  type: "color-hint";
  hint: Length;
};

type LinearGradient = {
  type: "linear-gradient" | "repeating-linear-gradient";
  angle: SideOrCornerGradientLine | AngleGradientLine;
  colorStops: (ColorStop | ColorHint)[];
};

type ConicGradient = {
  type: "conic-gradient" | "repeating-conic-gradient";
  // Normalized to degrees
  angle?: number;
  position: string;
  colorStops: (AngularColorStop | ColorHint)[];
};

type RadialGradient = {
  type: "radial-gradient" | "repeating-radial-gradient";
  endingShape: "circle" | "ellipse";
  size:
    | "closest-corner"
    | "closest-side"
    | "farthest-corner"
    | "farthest-side"
    | Length[];
  position: string;
  colorStops: (ColorStop | ColorHint)[];
};

const ANGLE_UNITS = ["deg", "turn", "rad", "grad"];
const ANGLE_OR_PERCENTAGE_UNITS = [...ANGLE_UNITS, "%"];

export function parseGradient(css: string): GradientNode[] {
  const parsed = parse(css);
  console.log("Parsed Output:", JSON.stringify(parsed));

  // Assuming the first node accurately represents the gradient type
  if (
    !parsed.nodes.length ||
    !["linear-gradient", "radial-gradient", "conic-gradient"].includes(
      parsed.value
    )
  ) {
    console.error("Incorrect or unsupported gradient format:", parsed.value);
    return [];
  }

  // The gradient type is always the first node's value; subsequent nodes are parameters
  const gradientType = parsed.value.replace(/^-webkit-/, "").trim();

  // Combine all subsequent nodes as part of the gradient definition
  let gradientNodes = parsed.nodes; // This should contain all elements defining the gradient

  // Factory or handler to manage gradient parsing based on the type
  switch (gradientType) {
    case "linear-gradient":
      return parseLinearGradient(gradientType, gradientNodes);
    case "radial-gradient":
      return parseRadialGradient(gradientType, gradientNodes);
    case "conic-gradient":
      return parseConicGradient(gradientType, gradientNodes);
    default:
      console.warn(
        `Unsupported or unrecognized gradient type: '${gradientType}'`
      );
      return []; // Return empty if the type is not recognized
  }
}

function parseLinearGradient(type: any, nodes: any[]): LinearGradient[] {
  console.log("Received nodes for linear gradient:", nodes);

  // Initialize empty arrays or default configurations for gradient settings.
  let angle: any = 0;
  let colorStops: any = [];

  nodes.forEach((node) => {
    if (node.type === "number") {
      console.log("Angle node found:", node);
      angle = node.value; // Assuming the first number type is always the angle
    } else if (node.type === "function" && node.value === "rgb") {
      console.log("Color node found:", node);
      const color = `rgba(${node.nodes
        .map((n: any) => n.value)
        .join(", ")}, 1)`;
      colorStops.push({ color: color, position: undefined }); // Position can be determined or left dynamic
    } else {
      console.error("Unsupported node type in gradient:", node);
    }
  });

  // Compilation of a pseudo-gradient node for further processing or application in your context
  return [
    {
      type: type,
      angle: angle,
      colorStops: colorStops,
    },
  ];
}

function parseRadialGradient(type: string, nodes: any[]): RadialGradient {
  console.log("Received nodes for Radial gradient:", nodes);

  let result: Partial<RadialGradient> = {
    type: type as RadialGradient["type"],
    endingShape: "ellipse", // default
    size: "farthest-corner", // default
    position: "center", // default
  };

  let hasOptionalArgs = false;

  // Handle the first set of arguments that define the shape, size, and position.
  const firstArgSet = nodes.shift() || [];
  for (let i = 0; i < firstArgSet.length; i++) {
    const arg = firstArgSet[i];
    switch (arg.value) {
      case "circle":
      case "ellipse":
        hasOptionalArgs = true;
        result.endingShape = arg.value;
        break;
      case "closest-corner":
      case "closest-side":
      case "farthest-corner":
      case "farthest-side":
        hasOptionalArgs = true;
        result.size = arg.value;
        break;
      case "at":
        hasOptionalArgs = true;
        result.position = parsePosition(firstArgSet.slice(i + 1));
        break;
      default:
        if (!hasOptionalArgs) {
          // Check if it's a custom size argument
          let length = toUnit(arg, "px");
          if (length) {
            if (!Array.isArray(result.size)) {
              result.size = [];
            }
            result.size.push(length);
          } else {
            // Handle incorrect argument
            console.error(`Unexpected radial-gradient argument: ${arg.value}`);
            break;
          }
        }
    }
  }

  // The remaining arguments should define color stops.
  if (nodes.length > 0 && Array.isArray(nodes[0])) {
    // Ensure that arguments are correct for color stops
    result.colorStops = nodes[0].map(toColorStopOrHint);
  }

  return result as RadialGradient;
}

function parsePosition(args: any[]): string {
  return args.map((arg) => arg.value).join(" ");
}

function parseConicGradient(type: string, args: any) {
  const ret: Partial<ConicGradient> = {
    type: type as ConicGradient["type"],
    position: "center",
  };

  let hasOptionalArg = false;
  const optionsArg = args[0];

  if (optionsArg[0].value === "from") {
    const value = toUnit(optionsArg[1], "deg");
    if (!value) throw new Error(`Angle expected: ` + stringify(optionsArg[1]));
    ret.angle = toDegrees(value);
    optionsArg.splice(0, 2);
    hasOptionalArg = true;
  }

  if (optionsArg[0].value === "at") {
    ret.position = stringifySpacedArgs(optionsArg.slice(1));
    hasOptionalArg = true;
  }

  if (hasOptionalArg) args.shift();

  ret.colorStops = args.map(toAngularColorStopOrHint);

  return ret as ConicGradient;
}

function toUnit(node: Node | undefined, unitForZero: string): Length | false {
  if (node?.type !== "word") return false;

  const ret = unit(node.value);
  if (!ret) return false;

  if (ret.unit) {
    ret.unit = ret.unit.toLowerCase();
  } else if (ret.number === "0") {
    // only 0 can be specified w/o unit
    ret.unit = unitForZero;
  } else {
    return false;
  }

  return {
    unit: ret.unit,
    value: parseFloat(ret.number),
  };
}

function toDegrees({ value, unit }: Length): number {
  switch (unit.toLowerCase()) {
    case "deg":
      return value;
    case "rad":
      return (180 * value) / Math.PI;
    case "grad":
      return (360 * value) / 400;
    case "turn":
      return 360 * value;
  }
  throw new Error("Unsupported dimension: " + unit);
}

function toRgba(node: Node): RgbaColor {
  return chroma(stringify(node)).gl();
}

function toColorStopOrHint(node: any): any {
  // If node represents structured color data, process accordingly
  if (
    Array.isArray(node) &&
    node.every(
      (subNode) => typeof subNode === "object" && subNode.value !== undefined
    )
  ) {
    return {
      color: `rgba(${node[0].value}, ${node[1].value}, ${node[2].value}, ${
        node[3] ? node[3].value : 1
      })`, // for RGB/RGBA
      position: node.length >= 5 ? parseFloat(node[4].value) : undefined, // assuming a position can optionally follow RGBA values
    };
  } else {
    console.error("Invalid node structure for color stops:", node);
    return {}; // To safely avoid runtime errors
  }
}

function toAngularColorStopOrHint(nodes: Node[]): AngularColorStop | ColorHint {
  if (nodes.length === 1) {
    const hint = toUnit(nodes[0], "deg");
    if (hint && ANGLE_OR_PERCENTAGE_UNITS.includes(hint.unit)) {
      return {
        type: "color-hint",
        hint,
      };
    }

    return {
      type: "angular-color-stop",
      rgba: toRgba(nodes[0]),
    };
  }

  if (nodes.length === 2) {
    const angle = toUnit(nodes[1], "deg");
    if (angle && ANGLE_OR_PERCENTAGE_UNITS.includes(angle.unit)) {
      return {
        type: "angular-color-stop",
        rgba: toRgba(nodes[0]),
        angle,
      };
    }
  }

  if (nodes.length === 3) {
    const angles = nodes.slice(1, 3).map((it) => toUnit(it, "deg"));
    if (angles.every((v) => v && ANGLE_OR_PERCENTAGE_UNITS.includes(v.unit))) {
      return {
        type: "angular-color-stop",
        rgba: toRgba(nodes[0]),
        angle: angles as AngularColorStop["angle"],
      };
    }
  }

  throw new Error("Invalid angular color stop: " + stringifySpacedArgs(nodes));
}

function stringifySpacedArgs(args: any[]): string {
  return args.map((arg) => arg.value).join(" ");
}

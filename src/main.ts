import { on, showUI } from "@create-figma-plugin/utilities";

import { applyTextColor } from "./utils/css/color";
import { applyBackgroundColor } from "./utils/css/background";
import {
  applyBorderShorthand,
  applyBorderColor,
  applyBorderStyle,
  applyBorderWidth,
  parseBorderProperty,
} from "./utils/css/border";
import { applyStylerToSelection } from "./utils/applyStyles";
import {
  applyDropShadow,
  applyInnerShadow,
  parseDropShadow,
  parseInnerShadow,
} from "./utils/css/shadow";

const stylerFunctions: { [key: string]: any } = {
  color: { applyFn: applyTextColor },
  "background-color": { applyFn: applyBackgroundColor },
  border: { applyFn: applyBorderShorthand, parser: parseBorderProperty },
  "border-color": { applyFn: applyBorderColor },
  "border-width": { applyFn: applyBorderWidth },
  "border-style": { applyFn: applyBorderStyle },
  "box-shadow": [
    { applyFn: applyDropShadow, parser: parseDropShadow },
    { applyFn: applyInnerShadow, parser: parseInnerShadow },
  ],
};

export default function () {
  const options = { width: 300, height: 360 };

  on("RESIZE_WINDOW", function (windowSize: { width: number; height: number }) {
    const { width, height } = windowSize;
    figma.ui.resize(width, height);
  });

  on("APPLY_CSS", (css: string) => {
    Object.entries(stylerFunctions).forEach(([property, value]) => {
      if (Array.isArray(value)) {
        // Multiple functions for the property
        value.forEach(({ applyFn, parser }) => {
          applyStylerToSelection(css, property, applyFn, parser);
        });
      } else {
        // Single function for the property
        const { applyFn, parser } = value;
        applyStylerToSelection(css, property, applyFn, parser);
      }
    });
  });

  showUI(options);
}
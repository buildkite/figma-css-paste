import { on, showUI } from "@create-figma-plugin/utilities";

import { applyTextColor } from "./utils/css/color";
import { applyBackgroundColor } from "./utils/css/background";
import {
  applyBorderShorthand,
  applyBorderColor,
  applyBorderStyle,
  applyBorderWidth,
  parseBorderProperty,
  applyLeftStrokeWidth,
  applyTopStrokeWidth,
  applyRightStrokeWidth,
  applyBottomStrokeWidth,
  applyTopStrokeColor,
  applyRightStrokeColor,
  applyBottomStrokeColor,
  applyLeftStrokeColor,
} from "./utils/css/border";
import { applyStylerToSelection } from "./utils/applyStyles";
import {
  applyDropShadow,
  applyInnerShadow,
  parseDropShadow,
  parseInnerShadow,
} from "./utils/css/shadow";
import {
  applyBorderBottomLeftRadius,
  applyBorderBottomRightRadius,
  applyBorderRadius,
  applyBorderTopLeftRadius,
  applyBorderTopRightRadius,
} from "./utils/css/borderRadius";

const stylerFunctions: { [key: string]: any } = {
  color: { applyFn: applyTextColor },
  "background-color": { applyFn: applyBackgroundColor },
  border: { applyFn: applyBorderShorthand, parser: parseBorderProperty }, // test for separate borders
  "border-top-width": { applyFn: applyTopStrokeWidth },
  "border-right-width": { applyFn: applyRightStrokeWidth },
  "border-bottom-width": { applyFn: applyBottomStrokeWidth },
  "border-left-width": { applyFn: applyLeftStrokeWidth },
  "border-top-color": { applyFn: applyTopStrokeColor },
  "border-right-color": { applyFn: applyRightStrokeColor },
  "border-bottom-color": { applyFn: applyBottomStrokeColor },
  "border-left-color": { applyFn: applyLeftStrokeColor },
  "border-color": { applyFn: applyBorderColor },
  "border-width": { applyFn: applyBorderWidth },
  "border-style": { applyFn: applyBorderStyle },
  "border-radius": { applyFn: applyBorderRadius },
  "border-top-left-radius": { applyFn: applyBorderRadius },
  "border-top-right-radius": { applyFn: applyBorderRadius },
  "border-bottom-left-radius": { applyFn: applyBorderRadius },
  "border-bottom-right-radius": { applyFn: applyBorderRadius },
  "box-shadow": [
    { applyFn: applyDropShadow, parser: parseDropShadow },
    { applyFn: applyInnerShadow, parser: parseInnerShadow },
  ],
  // Todo
  // font-family
  // font-weight
  // font-size
  // font-style
  // line-height
  // letter-spacing
  // text-align
  // text-decoration
  // background-image (gradients, images)
  // text-shadow
  // opacity
  // pading
  // flex
  // flex-direction
  // algin-items
  // justify-content
  // flex-wrap
  // flex-grow
  // filter: blur (layer blur)
  // backdrop-filter? (background blur)
  // background-blend-mode (layer blend mode)
  // overflow-hidden? clip?
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

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
import { applyBorderRadius } from "./utils/css/borderRadius";
import {
  applyTextDecoration,
  parseTextDecoration,
} from "./utils/css/typography/textDecoration";
import { applyTextTransform } from "./utils/css/typography/textTransform";
import { applyRotate } from "./utils/css/rotate";
import { applyWidth } from "./utils/css/width";
import { applyHeight } from "./utils/css/height";
import { applyOverflow } from "./utils/css/overflow";
import { applyOpacity } from "./utils/css/opacity";
import { applyFilterBlur } from "./utils/css/blur";
import { applyBgFilterBlur } from "./utils/css/backgroundBlur";
import { applyMixBlendMode } from "./utils/css/blendMode";
import {
  applyAlignItems,
  applyFlex,
  applyFlexDirection,
  applyFlexGrow,
  applyFlexWrap,
  applyGap,
  applyJustifyContent,
} from "./utils/css/flex";
import { applyPadding, parsePadding } from "./utils/css/padding";

const stylerFunctions: { [key: string]: any } = {
  color: { applyFn: applyTextColor },
  "background-color": { applyFn: applyBackgroundColor },
  border: { applyFn: applyBorderShorthand, parser: parseBorderProperty },
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
  "mix-blend-mode": {
    applyFn: applyMixBlendMode,
  },
  "text-decoration": {
    applyFn: applyTextDecoration,
    parser: parseTextDecoration,
  },
  "text-transform": { applyFn: applyTextTransform },
  display: { applyFn: applyFlex },
  "flex-direction": { applyFn: applyFlexDirection },
  "justify-content": { applyFn: applyJustifyContent },
  "align-items": { applyFn: applyAlignItems },
  "flex-wrap": { applyFn: applyFlexWrap },
  "flex-grow": { applyFn: applyFlexGrow },
  gap: { applyFn: applyGap },
  padding: { applyFn: applyPadding, parser: parsePadding },
  filter: { applyFn: applyFilterBlur },
  "backdrop-filter": { applyFn: applyBgFilterBlur },
  rotate: { applyFn: applyRotate },
  opacity: { applyFn: applyOpacity },
  overflow: { applyFn: applyOverflow },
  "overflow-y": { applyFn: applyOverflow },
  "overflow-x": { applyFn: applyOverflow },
  width: { applyFn: applyWidth },
  height: { applyFn: applyHeight },
};

export default function () {
  const options = { width: 300, height: 360 };

  on("RESIZE_WINDOW", function (windowSize: { width: number; height: number }) {
    const { width, height } = windowSize;
    figma.ui.resize(width, height);
  });

  on("APPLY_CSS", (css: string) => {
    Object.entries(stylerFunctions).forEach(([property, value]) => {
      // should contain property itself
      const regex = new RegExp(`\\b${property}\\s*:`, "g");
      if (regex.test(css)) {
        if (Array.isArray(value)) {
          value.forEach(({ applyFn, parser }) => {
            applyStylerToSelection(css, property, applyFn, parser);
          });
        } else {
          const { applyFn, parser } = value;
          applyStylerToSelection(css, property, applyFn, parser);
        }
      }
    });
  });

  showUI(options);
}

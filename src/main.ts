import { on, showUI } from "@create-figma-plugin/utilities";
import { extractCSSProperty } from "./utils/extract";

import { applyTextColor } from "./utils/css/color";
import { applyBackgroundColor } from "./utils/css/background";

export default function () {
  const options = { width: 300, height: 360 };

  on("RESIZE_WINDOW", function (windowSize: { width: number; height: number }) {
    const { width, height } = windowSize;
    figma.ui.resize(width, height);
  });

  on("APPLY_CSS", (css: string) => {
    const textColor = extractCSSProperty(css, "color");
    const bgColor = extractCSSProperty(css, "background-color");

    const selectedNodes = figma.currentPage.selection;

    if (textColor) {
      selectedNodes.forEach((node) => {
        applyTextColor(node, textColor);
      });
    }

    // Delay the application of background color to let Figma handle text color changes
    if (bgColor) {
      selectedNodes.forEach((node) => {
        applyBackgroundColor(node, bgColor);
      });
    }
  });

  showUI(options);
}

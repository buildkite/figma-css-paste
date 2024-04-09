import { on, showUI } from "@create-figma-plugin/utilities";

export default function () {
  const options = { width: 300, height: 360 };
  const data = { greeting: "Yoooooo" };
  on("RESIZE_WINDOW", function (windowSize: { width: number; height: number }) {
    const { width, height } = windowSize;
    figma.ui.resize(width, height);
  });
  showUI(options, data);
}

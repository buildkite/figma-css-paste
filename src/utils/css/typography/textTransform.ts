export async function applyTextTransform(
  node: TextNode,
  textTransform: string
) {
  if (node.type === "TEXT") {
    try {
      // Make sure the font is loaded before changing text properties
      await figma.loadFontAsync(node.fontName);
      let figmaTextCase: TextCase;

      switch (textTransform) {
        case "uppercase":
          figmaTextCase = "UPPER";
          break;
        case "lowercase":
          figmaTextCase = "LOWER";
          break;
        case "capitalize":
          figmaTextCase = "TITLE";
          break;
        default:
          figmaTextCase = "ORIGINAL";
      }

      node.textCase = figmaTextCase;
    } catch (e) {
      console.error(`Failed to load font: ${e}`);
    }
  }
}

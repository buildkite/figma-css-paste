type TextDecoration = "NONE" | "UNDERLINE" | "STRIKETHROUGH";

export async function applyTextDecoration(
  node: any,
  decoration: TextDecoration
) {
  if (node.type === "TEXT") {
    try {
      // Make sure the font is loaded before changing text properties
      await figma.loadFontAsync(node.fontName);

      // Reset properties
      node.textDecoration = "NONE";

      switch (decoration) {
        case "UNDERLINE":
          node.textDecoration = "UNDERLINE";
          break;
        case "STRIKETHROUGH":
          node.textDecoration = "STRIKETHROUGH";
          break;
        default:
          break;
      }
    } catch (e) {
      console.error(`Failed to load font: ${e}`);
    }
  } else if ("children" in node) {
    node
      .findAll((childNode: any) => childNode.type === "TEXT")
      .forEach(async (textNode: any) => {
        try {
          // Make sure the font is loaded before changing text properties
          await figma.loadFontAsync(textNode.fontName);

          // Reset properties
          textNode.textDecoration = "NONE";

          switch (decoration) {
            case "UNDERLINE":
              textNode.textDecoration = "UNDERLINE";
              break;
            case "STRIKETHROUGH":
              textNode.textDecoration = "STRIKETHROUGH";
              break;
            default:
              break;
          }
        } catch (e) {
          console.error(`Failed to load font`);
        }
      });
  }
}

export function parseTextDecoration(decoration: string): TextDecoration {
  switch (decoration) {
    case "underline":
      return "UNDERLINE";
    case "line-through":
      return "STRIKETHROUGH";
    case "none":
    default:
      return "NONE";
  }
}

// Function to set direction
export function applyFlex(node: any, display: string) {
  if (display === "flex") {
    node.layoutMode = "HORIZONTAL";
  } else {
    node.layoutMode = "NONE";
  }
}

// Function to set direction
export function applyFlexDirection(node: any, direction: string) {
  if (direction === "row") {
    node.layoutMode = "HORIZONTAL";
  } else if (direction === "column") {
    node.layoutMode = "VERTICAL";
  }
}

// Function to set horizontal alignment
export function applyJustifyContent(node: any, justifyContent: string) {
  if (justifyContent === "flex-start") {
    node.primaryAxisAlignItems = "MIN";
  } else if (justifyContent === "flex-end") {
    node.primaryAxisAlignItems = "MAX";
  } else if (justifyContent === "center") {
    node.primaryAxisAlignItems = "CENTER";
  } else if (justifyContent === "space-between") {
    node.primaryAxisAlignItems = "SPACE_BETWEEN";
  }
}

// Function to set vertical alignment
export function applyAlignItems(node: any, alignItems: string) {
  if (alignItems === "flex-start") {
    node.counterAxisAlignItems = "MIN";
  } else if (alignItems === "flex-end") {
    node.counterAxisAlignItems = "MAX";
  } else if (alignItems === "center") {
    node.counterAxisAlignItems = "CENTER";
  }
}

// Function to set wrapping
export function applyFlexWrap(node: any, flexWrap: string) {
  if (flexWrap === "nowrap") {
    node.layoutWrap = "NO_WRAP";
  } else if (flexWrap === "wrap") {
    node.layoutWrap = "WRAP";
  }
}

// Function to set gap spacing
export function applyGap(node: any, gap: string) {
  node.itemSpacing = parseFloat(gap);
}

// Function to set flex grow
export function applyFlexGrow(node: any, grow: string) {
  node.layoutGrow = parseFloat(grow);
}

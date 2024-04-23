export function applyOverflow(node: any, overflow: string) {
  if (overflow === "hidden") {
    node.clipsContent = true;
  } else {
    node.clipsContent = false;
  }
}

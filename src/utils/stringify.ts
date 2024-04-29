interface Node {
  type: string;
  value: string;
  quote?: string;
  unclosed?: boolean;
  before?: string;
  after?: string;
  nodes?: Node[];
}

type CustomFunction = (node: Node) => string | undefined;

export function stringifyNode(node: Node, custom?: CustomFunction): string {
  let type = node.type;
  let value = node.value;
  let buf: string;
  let customResult: string | undefined;

  if (custom && (customResult = custom(node)) !== undefined) {
    return customResult;
  } else if (type === "word" || type === "space") {
    return value;
  } else if (type === "string") {
    buf = node.quote || "";
    return buf + value + (node.unclosed ? "" : buf);
  } else if (type === "comment") {
    return "/*" + value + (node.unclosed ? "" : "*/");
  } else if (type === "div") {
    return (node.before || "") + value + (node.after || "");
  } else if (Array.isArray(node.nodes)) {
    buf = stringify(node.nodes, custom);
    if (type !== "function") {
      return buf;
    }
    return (
      value +
      "(" +
      (node.before || "") +
      buf +
      (node.after || "") +
      (node.unclosed ? "" : ")")
    );
  }
  return value;
}

export function stringify(
  nodes: Node | Node[],
  custom?: CustomFunction
): string {
  let result: string;
  let i: number;

  if (Array.isArray(nodes)) {
    result = "";
    for (i = nodes.length - 1; ~i; i -= 1) {
      result = stringifyNode(nodes[i], custom) + result;
    }
    return result;
  }
  return stringifyNode(nodes, custom);
}

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@create-figma-plugin/utilities/lib/events.js
function on(name, handler) {
  const id = `${currentId}`;
  currentId += 1;
  eventHandlers[id] = { handler, name };
  return function() {
    delete eventHandlers[id];
  };
}
function invokeEventHandler(name, args) {
  let invoked = false;
  for (const id in eventHandlers) {
    if (eventHandlers[id].name === name) {
      eventHandlers[id].handler.apply(null, args);
      invoked = true;
    }
  }
  if (invoked === false) {
    throw new Error(`No event handler with name \`${name}\``);
  }
}
var eventHandlers, currentId;
var init_events = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/events.js"() {
    eventHandlers = {};
    currentId = 0;
    if (typeof window === "undefined") {
      figma.ui.onmessage = function(args) {
        if (!Array.isArray(args)) {
          return;
        }
        const [name, ...rest] = args;
        if (typeof name !== "string") {
          return;
        }
        invokeEventHandler(name, rest);
      };
    } else {
      window.onmessage = function(event) {
        if (typeof event.data.pluginMessage === "undefined") {
          return;
        }
        const args = event.data.pluginMessage;
        if (!Array.isArray(args)) {
          return;
        }
        const [name, ...rest] = event.data.pluginMessage;
        if (typeof name !== "string") {
          return;
        }
        invokeEventHandler(name, rest);
      };
    }
  }
});

// node_modules/@create-figma-plugin/utilities/lib/ui.js
function showUI(options, data) {
  if (typeof __html__ === "undefined") {
    throw new Error("No UI defined");
  }
  const html = `<div id="create-figma-plugin"></div><script>document.body.classList.add('theme-${figma.editorType}');const __FIGMA_COMMAND__='${typeof figma.command === "undefined" ? "" : figma.command}';const __SHOW_UI_DATA__=${JSON.stringify(typeof data === "undefined" ? {} : data)};${__html__}</script>`;
  figma.showUI(html, __spreadProps(__spreadValues({}, options), {
    themeColors: typeof options.themeColors === "undefined" ? true : options.themeColors
  }));
}
var init_ui = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/ui.js"() {
  }
});

// node_modules/@create-figma-plugin/utilities/lib/index.js
var init_lib = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/index.js"() {
    init_events();
    init_ui();
  }
});

// src/utils/extractStyles.ts
function extractCSSProperty(css, property) {
  const regex = new RegExp(`${property}:\\s*(.*?)\\s*;`);
  const match = css.match(regex);
  return match ? match[1] : null;
}
function parseBorderProperty(border) {
  const properties = border.split(" ");
  if (properties.length === 3) {
    const width = properties[0];
    const style = properties[1];
    const color = properties[2];
    if (!isNaN(parseFloat(width)) && ["solid", "dashed", "dotted"].includes(style) && /^#([0-9a-f]{3}){1,2}$/i.test(color)) {
      return [width, style, color];
    }
  }
  return void 0;
}
var init_extractStyles = __esm({
  "src/utils/extractStyles.ts"() {
    "use strict";
  }
});

// src/utils/css/color.ts
function applyTextColor(node, color) {
  if (node.type === "TEXT") {
    const newFill = figma.util.solidPaint(color);
    node.fills = [newFill];
  } else if ("children" in node) {
    node.findAll((n) => n.type === "TEXT").forEach((textNode) => {
      const newFill = figma.util.solidPaint(color);
      textNode.fills = [newFill];
    });
  }
}
var init_color = __esm({
  "src/utils/css/color.ts"() {
    "use strict";
  }
});

// src/utils/css/background.ts
function applyBackgroundColor(node, color) {
  if (node.type !== "TEXT" && fillableNodeTypes.includes(node.type)) {
    const newFill = figma.util.solidPaint(color);
    node.fills = [newFill];
  }
}
var fillableNodeTypes;
var init_background = __esm({
  "src/utils/css/background.ts"() {
    "use strict";
    fillableNodeTypes = [
      "RECTANGLE",
      "ELLIPSE",
      "POLYGON",
      "STAR",
      "VECTOR",
      "FRAME",
      "COMPONENT",
      "INSTANCE"
    ];
  }
});

// src/utils/css/border.ts
function applyProperty(node, property, value) {
  if (node && property in node) {
    node[property] = value;
  }
}
function applyBorderShorthand(node, width, style, color) {
  var _a, _b;
  const numericWidth = parseFloat(width);
  applyProperty(node, "strokes", [figma.util.solidPaint(color)]);
  applyProperty(node, "strokeWeight", numericWidth);
  const styles = {
    solid: {
      miterLimit: 4,
      dashPattern: []
    },
    dashed: {
      dashPattern: [numericWidth * 2, numericWidth * 2]
    },
    dotted: {
      dashPattern: [numericWidth, numericWidth]
    },
    default: {
      dashPattern: []
    }
  };
  node.strokeMiterLimit = ((_a = styles[style]) == null ? void 0 : _a.miterLimit) || 4;
  applyProperty(
    node,
    "dashPattern",
    ((_b = styles[style]) == null ? void 0 : _b.dashPattern) || styles.default.dashPattern
  );
}
function applyStrokeColor(node, color) {
  applyProperty(node, "strokes", [figma.util.solidPaint(color)]);
}
function applyStrokeWidth(node, width) {
  applyProperty(node, "strokeWeight", parseFloat(width));
}
function applyStrokeStyle(node, style) {
  const styles = {
    solid: { miterLimit: 4, dashPattern: [] },
    dashed: { dashPattern: [node.strokeWeight * 2, node.strokeWeight * 2] },
    dotted: { dashPattern: [node.strokeWeight, node.strokeWeight] },
    default: { dashPattern: [] }
  };
  if (style in styles) {
    node.strokeMiterLimit = styles[style].miterLimit || 4;
    applyProperty(node, "dashPattern", styles[style].dashPattern);
  }
}
var init_border = __esm({
  "src/utils/css/border.ts"() {
    "use strict";
  }
});

// src/utils/applyStyles.ts
function applyStylerToSelection(css, property, styler, propertyParser) {
  let propValue = extractCSSProperty(css, property);
  if (propValue !== "" && propValue !== null) {
    const parsedPropValue = propertyParser ? propertyParser(propValue) : propValue;
    const selectedNodes = figma.currentPage.selection;
    selectedNodes.forEach(
      (node) => styler(node, ...[].concat(parsedPropValue))
    );
  }
}
var init_applyStyles = __esm({
  "src/utils/applyStyles.ts"() {
    "use strict";
    init_extractStyles();
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
function main_default() {
  const options = { width: 300, height: 360 };
  on("RESIZE_WINDOW", function(windowSize) {
    const { width, height } = windowSize;
    figma.ui.resize(width, height);
  });
  on("APPLY_CSS", (css) => {
    Object.entries(stylerFunctions).forEach(
      ([property, { applyFn, parser }]) => {
        applyStylerToSelection(css, property, applyFn, parser);
      }
    );
  });
  showUI(options);
}
var stylerFunctions;
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
    init_lib();
    init_extractStyles();
    init_color();
    init_background();
    init_border();
    init_applyStyles();
    stylerFunctions = {
      color: { applyFn: applyTextColor },
      "background-color": { applyFn: applyBackgroundColor },
      border: { applyFn: applyBorderShorthand, parser: parseBorderProperty },
      "border-color": { applyFn: applyStrokeColor },
      "border-width": { applyFn: applyStrokeWidth },
      "border-style": { applyFn: applyStrokeStyle }
    };
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();

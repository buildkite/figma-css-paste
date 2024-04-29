var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// node_modules/chroma-js/src/utils/limit.js
var require_limit = __commonJS({
  "node_modules/chroma-js/src/utils/limit.js"(exports, module) {
    module.exports = (x, min = 0, max = 1) => {
      return x < min ? min : x > max ? max : x;
    };
  }
});

// node_modules/chroma-js/src/utils/clip_rgb.js
var require_clip_rgb = __commonJS({
  "node_modules/chroma-js/src/utils/clip_rgb.js"(exports, module) {
    var limit = require_limit();
    module.exports = (rgb) => {
      rgb._clipped = false;
      rgb._unclipped = rgb.slice(0);
      for (let i = 0; i <= 3; i++) {
        if (i < 3) {
          if (rgb[i] < 0 || rgb[i] > 255)
            rgb._clipped = true;
          rgb[i] = limit(rgb[i], 0, 255);
        } else if (i === 3) {
          rgb[i] = limit(rgb[i], 0, 1);
        }
      }
      return rgb;
    };
  }
});

// node_modules/chroma-js/src/utils/type.js
var require_type = __commonJS({
  "node_modules/chroma-js/src/utils/type.js"(exports, module) {
    var classToType = {};
    for (let name of ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Undefined", "Null"]) {
      classToType[`[object ${name}]`] = name.toLowerCase();
    }
    module.exports = function(obj) {
      return classToType[Object.prototype.toString.call(obj)] || "object";
    };
  }
});

// node_modules/chroma-js/src/utils/unpack.js
var require_unpack = __commonJS({
  "node_modules/chroma-js/src/utils/unpack.js"(exports, module) {
    var type = require_type();
    module.exports = (args, keyOrder = null) => {
      if (args.length >= 3)
        return Array.prototype.slice.call(args);
      if (type(args[0]) == "object" && keyOrder) {
        return keyOrder.split("").filter((k) => args[0][k] !== void 0).map((k) => args[0][k]);
      }
      return args[0];
    };
  }
});

// node_modules/chroma-js/src/utils/last.js
var require_last = __commonJS({
  "node_modules/chroma-js/src/utils/last.js"(exports, module) {
    var type = require_type();
    module.exports = (args) => {
      if (args.length < 2)
        return null;
      const l = args.length - 1;
      if (type(args[l]) == "string")
        return args[l].toLowerCase();
      return null;
    };
  }
});

// node_modules/chroma-js/src/utils/index.js
var require_utils = __commonJS({
  "node_modules/chroma-js/src/utils/index.js"(exports, module) {
    var PI = Math.PI;
    module.exports = {
      clip_rgb: require_clip_rgb(),
      limit: require_limit(),
      type: require_type(),
      unpack: require_unpack(),
      last: require_last(),
      PI,
      TWOPI: PI * 2,
      PITHIRD: PI / 3,
      DEG2RAD: PI / 180,
      RAD2DEG: 180 / PI
    };
  }
});

// node_modules/chroma-js/src/io/input.js
var require_input = __commonJS({
  "node_modules/chroma-js/src/io/input.js"(exports, module) {
    module.exports = {
      format: {},
      autodetect: []
    };
  }
});

// node_modules/chroma-js/src/Color.js
var require_Color = __commonJS({
  "node_modules/chroma-js/src/Color.js"(exports, module) {
    var { last, clip_rgb, type } = require_utils();
    var _input = require_input();
    var Color = class {
      constructor(...args) {
        const me = this;
        if (type(args[0]) === "object" && args[0].constructor && args[0].constructor === this.constructor) {
          return args[0];
        }
        let mode = last(args);
        let autodetect = false;
        if (!mode) {
          autodetect = true;
          if (!_input.sorted) {
            _input.autodetect = _input.autodetect.sort((a, b) => b.p - a.p);
            _input.sorted = true;
          }
          for (let chk of _input.autodetect) {
            mode = chk.test(...args);
            if (mode)
              break;
          }
        }
        if (_input.format[mode]) {
          const rgb = _input.format[mode].apply(null, autodetect ? args : args.slice(0, -1));
          me._rgb = clip_rgb(rgb);
        } else {
          throw new Error("unknown format: " + args);
        }
        if (me._rgb.length === 3)
          me._rgb.push(1);
      }
      toString() {
        if (type(this.hex) == "function")
          return this.hex();
        return `[${this._rgb.join(",")}]`;
      }
    };
    module.exports = Color;
  }
});

// node_modules/chroma-js/src/chroma.js
var require_chroma = __commonJS({
  "node_modules/chroma-js/src/chroma.js"(exports, module) {
    var chroma7 = (...args) => {
      return new chroma7.Color(...args);
    };
    chroma7.Color = require_Color();
    chroma7.version = "@@version";
    module.exports = chroma7;
  }
});

// node_modules/chroma-js/src/io/cmyk/rgb2cmyk.js
var require_rgb2cmyk = __commonJS({
  "node_modules/chroma-js/src/io/cmyk/rgb2cmyk.js"(exports, module) {
    var { unpack } = require_utils();
    var { max } = Math;
    var rgb2cmyk = (...args) => {
      let [r, g, b] = unpack(args, "rgb");
      r = r / 255;
      g = g / 255;
      b = b / 255;
      const k = 1 - max(r, max(g, b));
      const f = k < 1 ? 1 / (1 - k) : 0;
      const c = (1 - r - k) * f;
      const m = (1 - g - k) * f;
      const y = (1 - b - k) * f;
      return [c, m, y, k];
    };
    module.exports = rgb2cmyk;
  }
});

// node_modules/chroma-js/src/io/cmyk/cmyk2rgb.js
var require_cmyk2rgb = __commonJS({
  "node_modules/chroma-js/src/io/cmyk/cmyk2rgb.js"(exports, module) {
    var { unpack } = require_utils();
    var cmyk2rgb = (...args) => {
      args = unpack(args, "cmyk");
      const [c, m, y, k] = args;
      const alpha = args.length > 4 ? args[4] : 1;
      if (k === 1)
        return [0, 0, 0, alpha];
      return [
        c >= 1 ? 0 : 255 * (1 - c) * (1 - k),
        // r
        m >= 1 ? 0 : 255 * (1 - m) * (1 - k),
        // g
        y >= 1 ? 0 : 255 * (1 - y) * (1 - k),
        // b
        alpha
      ];
    };
    module.exports = cmyk2rgb;
  }
});

// node_modules/chroma-js/src/io/cmyk/index.js
var require_cmyk = __commonJS({
  "node_modules/chroma-js/src/io/cmyk/index.js"() {
    var chroma7 = require_chroma();
    var Color = require_Color();
    var input = require_input();
    var { unpack, type } = require_utils();
    var rgb2cmyk = require_rgb2cmyk();
    Color.prototype.cmyk = function() {
      return rgb2cmyk(this._rgb);
    };
    chroma7.cmyk = (...args) => new Color(...args, "cmyk");
    input.format.cmyk = require_cmyk2rgb();
    input.autodetect.push({
      p: 2,
      test: (...args) => {
        args = unpack(args, "cmyk");
        if (type(args) === "array" && args.length === 4) {
          return "cmyk";
        }
      }
    });
  }
});

// node_modules/chroma-js/src/io/css/hsl2css.js
var require_hsl2css = __commonJS({
  "node_modules/chroma-js/src/io/css/hsl2css.js"(exports, module) {
    var { unpack, last } = require_utils();
    var rnd = (a) => Math.round(a * 100) / 100;
    var hsl2css = (...args) => {
      const hsla = unpack(args, "hsla");
      let mode = last(args) || "lsa";
      hsla[0] = rnd(hsla[0] || 0);
      hsla[1] = rnd(hsla[1] * 100) + "%";
      hsla[2] = rnd(hsla[2] * 100) + "%";
      if (mode === "hsla" || hsla.length > 3 && hsla[3] < 1) {
        hsla[3] = hsla.length > 3 ? hsla[3] : 1;
        mode = "hsla";
      } else {
        hsla.length = 3;
      }
      return `${mode}(${hsla.join(",")})`;
    };
    module.exports = hsl2css;
  }
});

// node_modules/chroma-js/src/io/hsl/rgb2hsl.js
var require_rgb2hsl = __commonJS({
  "node_modules/chroma-js/src/io/hsl/rgb2hsl.js"(exports, module) {
    var { unpack } = require_utils();
    var rgb2hsl = (...args) => {
      args = unpack(args, "rgba");
      let [r, g, b] = args;
      r /= 255;
      g /= 255;
      b /= 255;
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const l = (max + min) / 2;
      let s, h;
      if (max === min) {
        s = 0;
        h = Number.NaN;
      } else {
        s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
      }
      if (r == max)
        h = (g - b) / (max - min);
      else if (g == max)
        h = 2 + (b - r) / (max - min);
      else if (b == max)
        h = 4 + (r - g) / (max - min);
      h *= 60;
      if (h < 0)
        h += 360;
      if (args.length > 3 && args[3] !== void 0)
        return [h, s, l, args[3]];
      return [h, s, l];
    };
    module.exports = rgb2hsl;
  }
});

// node_modules/chroma-js/src/io/css/rgb2css.js
var require_rgb2css = __commonJS({
  "node_modules/chroma-js/src/io/css/rgb2css.js"(exports, module) {
    var { unpack, last } = require_utils();
    var hsl2css = require_hsl2css();
    var rgb2hsl = require_rgb2hsl();
    var { round } = Math;
    var rgb2css = (...args) => {
      const rgba = unpack(args, "rgba");
      let mode = last(args) || "rgb";
      if (mode.substr(0, 3) == "hsl") {
        return hsl2css(rgb2hsl(rgba), mode);
      }
      rgba[0] = round(rgba[0]);
      rgba[1] = round(rgba[1]);
      rgba[2] = round(rgba[2]);
      if (mode === "rgba" || rgba.length > 3 && rgba[3] < 1) {
        rgba[3] = rgba.length > 3 ? rgba[3] : 1;
        mode = "rgba";
      }
      return `${mode}(${rgba.slice(0, mode === "rgb" ? 3 : 4).join(",")})`;
    };
    module.exports = rgb2css;
  }
});

// node_modules/chroma-js/src/io/hsl/hsl2rgb.js
var require_hsl2rgb = __commonJS({
  "node_modules/chroma-js/src/io/hsl/hsl2rgb.js"(exports, module) {
    var { unpack } = require_utils();
    var { round } = Math;
    var hsl2rgb = (...args) => {
      args = unpack(args, "hsl");
      const [h, s, l] = args;
      let r, g, b;
      if (s === 0) {
        r = g = b = l * 255;
      } else {
        const t3 = [0, 0, 0];
        const c = [0, 0, 0];
        const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const t1 = 2 * l - t2;
        const h_ = h / 360;
        t3[0] = h_ + 1 / 3;
        t3[1] = h_;
        t3[2] = h_ - 1 / 3;
        for (let i = 0; i < 3; i++) {
          if (t3[i] < 0)
            t3[i] += 1;
          if (t3[i] > 1)
            t3[i] -= 1;
          if (6 * t3[i] < 1)
            c[i] = t1 + (t2 - t1) * 6 * t3[i];
          else if (2 * t3[i] < 1)
            c[i] = t2;
          else if (3 * t3[i] < 2)
            c[i] = t1 + (t2 - t1) * (2 / 3 - t3[i]) * 6;
          else
            c[i] = t1;
        }
        [r, g, b] = [round(c[0] * 255), round(c[1] * 255), round(c[2] * 255)];
      }
      if (args.length > 3) {
        return [r, g, b, args[3]];
      }
      return [r, g, b, 1];
    };
    module.exports = hsl2rgb;
  }
});

// node_modules/chroma-js/src/io/css/css2rgb.js
var require_css2rgb = __commonJS({
  "node_modules/chroma-js/src/io/css/css2rgb.js"(exports, module) {
    var hsl2rgb = require_hsl2rgb();
    var input = require_input();
    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var { round } = Math;
    var css2rgb = (css) => {
      css = css.toLowerCase().trim();
      let m;
      if (input.format.named) {
        try {
          return input.format.named(css);
        } catch (e) {
        }
      }
      if (m = css.match(RE_RGB)) {
        const rgb = m.slice(1, 4);
        for (let i = 0; i < 3; i++) {
          rgb[i] = +rgb[i];
        }
        rgb[3] = 1;
        return rgb;
      }
      if (m = css.match(RE_RGBA)) {
        const rgb = m.slice(1, 5);
        for (let i = 0; i < 4; i++) {
          rgb[i] = +rgb[i];
        }
        return rgb;
      }
      if (m = css.match(RE_RGB_PCT)) {
        const rgb = m.slice(1, 4);
        for (let i = 0; i < 3; i++) {
          rgb[i] = round(rgb[i] * 2.55);
        }
        rgb[3] = 1;
        return rgb;
      }
      if (m = css.match(RE_RGBA_PCT)) {
        const rgb = m.slice(1, 5);
        for (let i = 0; i < 3; i++) {
          rgb[i] = round(rgb[i] * 2.55);
        }
        rgb[3] = +rgb[3];
        return rgb;
      }
      if (m = css.match(RE_HSL)) {
        const hsl = m.slice(1, 4);
        hsl[1] *= 0.01;
        hsl[2] *= 0.01;
        const rgb = hsl2rgb(hsl);
        rgb[3] = 1;
        return rgb;
      }
      if (m = css.match(RE_HSLA)) {
        const hsl = m.slice(1, 4);
        hsl[1] *= 0.01;
        hsl[2] *= 0.01;
        const rgb = hsl2rgb(hsl);
        rgb[3] = +m[4];
        return rgb;
      }
    };
    css2rgb.test = (s) => {
      return RE_RGB.test(s) || RE_RGBA.test(s) || RE_RGB_PCT.test(s) || RE_RGBA_PCT.test(s) || RE_HSL.test(s) || RE_HSLA.test(s);
    };
    module.exports = css2rgb;
  }
});

// node_modules/chroma-js/src/io/css/index.js
var require_css = __commonJS({
  "node_modules/chroma-js/src/io/css/index.js"() {
    var chroma7 = require_chroma();
    var Color = require_Color();
    var input = require_input();
    var { type } = require_utils();
    var rgb2css = require_rgb2css();
    var css2rgb = require_css2rgb();
    Color.prototype.css = function(mode) {
      return rgb2css(this._rgb, mode);
    };
    chroma7.css = (...args) => new Color(...args, "css");
    input.format.css = css2rgb;
    input.autodetect.push({
      p: 5,
      test: (h, ...rest) => {
        if (!rest.length && type(h) === "string" && css2rgb.test(h)) {
          return "css";
        }
      }
    });
  }
});

// node_modules/chroma-js/src/io/gl/index.js
var require_gl = __commonJS({
  "node_modules/chroma-js/src/io/gl/index.js"() {
    var Color = require_Color();
    var chroma7 = require_chroma();
    var input = require_input();
    var { unpack } = require_utils();
    input.format.gl = (...args) => {
      const rgb = unpack(args, "rgba");
      rgb[0] *= 255;
      rgb[1] *= 255;
      rgb[2] *= 255;
      return rgb;
    };
    chroma7.gl = (...args) => new Color(...args, "gl");
    Color.prototype.gl = function() {
      const rgb = this._rgb;
      return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
    };
  }
});

// node_modules/chroma-js/src/io/hcg/rgb2hcg.js
var require_rgb2hcg = __commonJS({
  "node_modules/chroma-js/src/io/hcg/rgb2hcg.js"(exports, module) {
    var { unpack } = require_utils();
    var rgb2hcg = (...args) => {
      const [r, g, b] = unpack(args, "rgb");
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const delta = max - min;
      const c = delta * 100 / 255;
      const _g = min / (255 - delta) * 100;
      let h;
      if (delta === 0) {
        h = Number.NaN;
      } else {
        if (r === max)
          h = (g - b) / delta;
        if (g === max)
          h = 2 + (b - r) / delta;
        if (b === max)
          h = 4 + (r - g) / delta;
        h *= 60;
        if (h < 0)
          h += 360;
      }
      return [h, c, _g];
    };
    module.exports = rgb2hcg;
  }
});

// node_modules/chroma-js/src/io/hcg/hcg2rgb.js
var require_hcg2rgb = __commonJS({
  "node_modules/chroma-js/src/io/hcg/hcg2rgb.js"(exports, module) {
    var { unpack } = require_utils();
    var { floor } = Math;
    var hcg2rgb = (...args) => {
      args = unpack(args, "hcg");
      let [h, c, _g] = args;
      let r, g, b;
      _g = _g * 255;
      const _c = c * 255;
      if (c === 0) {
        r = g = b = _g;
      } else {
        if (h === 360)
          h = 0;
        if (h > 360)
          h -= 360;
        if (h < 0)
          h += 360;
        h /= 60;
        const i = floor(h);
        const f = h - i;
        const p = _g * (1 - c);
        const q = p + _c * (1 - f);
        const t = p + _c * f;
        const v = p + _c;
        switch (i) {
          case 0:
            [r, g, b] = [v, t, p];
            break;
          case 1:
            [r, g, b] = [q, v, p];
            break;
          case 2:
            [r, g, b] = [p, v, t];
            break;
          case 3:
            [r, g, b] = [p, q, v];
            break;
          case 4:
            [r, g, b] = [t, p, v];
            break;
          case 5:
            [r, g, b] = [v, p, q];
            break;
        }
      }
      return [r, g, b, args.length > 3 ? args[3] : 1];
    };
    module.exports = hcg2rgb;
  }
});

// node_modules/chroma-js/src/io/hcg/index.js
var require_hcg = __commonJS({
  "node_modules/chroma-js/src/io/hcg/index.js"() {
    var { unpack, type } = require_utils();
    var chroma7 = require_chroma();
    var Color = require_Color();
    var input = require_input();
    var rgb2hcg = require_rgb2hcg();
    Color.prototype.hcg = function() {
      return rgb2hcg(this._rgb);
    };
    chroma7.hcg = (...args) => new Color(...args, "hcg");
    input.format.hcg = require_hcg2rgb();
    input.autodetect.push({
      p: 1,
      test: (...args) => {
        args = unpack(args, "hcg");
        if (type(args) === "array" && args.length === 3) {
          return "hcg";
        }
      }
    });
  }
});

// node_modules/chroma-js/src/io/hex/rgb2hex.js
var require_rgb2hex = __commonJS({
  "node_modules/chroma-js/src/io/hex/rgb2hex.js"(exports, module) {
    var { unpack, last } = require_utils();
    var { round } = Math;
    var rgb2hex = (...args) => {
      let [r, g, b, a] = unpack(args, "rgba");
      let mode = last(args) || "auto";
      if (a === void 0)
        a = 1;
      if (mode === "auto") {
        mode = a < 1 ? "rgba" : "rgb";
      }
      r = round(r);
      g = round(g);
      b = round(b);
      const u = r << 16 | g << 8 | b;
      let str = "000000" + u.toString(16);
      str = str.substr(str.length - 6);
      let hxa = "0" + round(a * 255).toString(16);
      hxa = hxa.substr(hxa.length - 2);
      switch (mode.toLowerCase()) {
        case "rgba":
          return `#${str}${hxa}`;
        case "argb":
          return `#${hxa}${str}`;
        default:
          return `#${str}`;
      }
    };
    module.exports = rgb2hex;
  }
});

// node_modules/chroma-js/src/io/hex/hex2rgb.js
var require_hex2rgb = __commonJS({
  "node_modules/chroma-js/src/io/hex/hex2rgb.js"(exports, module) {
    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
    var hex2rgb = (hex) => {
      if (hex.match(RE_HEX)) {
        if (hex.length === 4 || hex.length === 7) {
          hex = hex.substr(1);
        }
        if (hex.length === 3) {
          hex = hex.split("");
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        const u = parseInt(hex, 16);
        const r = u >> 16;
        const g = u >> 8 & 255;
        const b = u & 255;
        return [r, g, b, 1];
      }
      if (hex.match(RE_HEXA)) {
        if (hex.length === 5 || hex.length === 9) {
          hex = hex.substr(1);
        }
        if (hex.length === 4) {
          hex = hex.split("");
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        const u = parseInt(hex, 16);
        const r = u >> 24 & 255;
        const g = u >> 16 & 255;
        const b = u >> 8 & 255;
        const a = Math.round((u & 255) / 255 * 100) / 100;
        return [r, g, b, a];
      }
      throw new Error(`unknown hex color: ${hex}`);
    };
    module.exports = hex2rgb;
  }
});

// node_modules/chroma-js/src/io/hex/index.js
var require_hex = __commonJS({
  "node_modules/chroma-js/src/io/hex/index.js"() {
    var chroma7 = require_chroma();
    var Color = require_Color();
    var { type } = require_utils();
    var input = require_input();
    var rgb2hex = require_rgb2hex();
    Color.prototype.hex = function(mode) {
      return rgb2hex(this._rgb, mode);
    };
    chroma7.hex = (...args) => new Color(...args, "hex");
    input.format.hex = require_hex2rgb();
    input.autodetect.push({
      p: 4,
      test: (h, ...rest) => {
        if (!rest.length && type(h) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0) {
          return "hex";
        }
      }
    });
  }
});

// node_modules/chroma-js/src/io/hsi/rgb2hsi.js
var require_rgb2hsi = __commonJS({
  "node_modules/chroma-js/src/io/hsi/rgb2hsi.js"(exports, module) {
    var { unpack, TWOPI } = require_utils();
    var { min, sqrt, acos } = Math;
    var rgb2hsi = (...args) => {
      let [r, g, b] = unpack(args, "rgb");
      r /= 255;
      g /= 255;
      b /= 255;
      let h;
      const min_ = min(r, g, b);
      const i = (r + g + b) / 3;
      const s = i > 0 ? 1 - min_ / i : 0;
      if (s === 0) {
        h = NaN;
      } else {
        h = (r - g + (r - b)) / 2;
        h /= sqrt((r - g) * (r - g) + (r - b) * (g - b));
        h = acos(h);
        if (b > g) {
          h = TWOPI - h;
        }
        h /= TWOPI;
      }
      return [h * 360, s, i];
    };
    module.exports = rgb2hsi;
  }
});

// node_modules/chroma-js/src/io/hsi/hsi2rgb.js
var require_hsi2rgb = __commonJS({
  "node_modules/chroma-js/src/io/hsi/hsi2rgb.js"(exports, module) {
    var { unpack, limit, TWOPI, PITHIRD } = require_utils();
    var { cos } = Math;
    var hsi2rgb = (...args) => {
      args = unpack(args, "hsi");
      let [h, s, i] = args;
      let r, g, b;
      if (isNaN(h))
        h = 0;
      if (isNaN(s))
        s = 0;
      if (h > 360)
        h -= 360;
      if (h < 0)
        h += 360;
      h /= 360;
      if (h < 1 / 3) {
        b = (1 - s) / 3;
        r = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
        g = 1 - (b + r);
      } else if (h < 2 / 3) {
        h -= 1 / 3;
        r = (1 - s) / 3;
        g = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
        b = 1 - (r + g);
      } else {
        h -= 2 / 3;
        g = (1 - s) / 3;
        b = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
        r = 1 - (g + b);
      }
      r = limit(i * r * 3);
      g = limit(i * g * 3);
      b = limit(i * b * 3);
      return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
    };
    module.exports = hsi2rgb;
  }
});

// node_modules/chroma-js/src/io/hsi/index.js
var require_hsi = __commonJS({
  "node_modules/chroma-js/src/io/hsi/index.js"() {
    var { unpack, type } = require_utils();
    var chroma7 = require_chroma();
    var Color = require_Color();
    var input = require_input();
    var rgb2hsi = require_rgb2hsi();
    Color.prototype.hsi = function() {
      return rgb2hsi(this._rgb);
    };
    chroma7.hsi = (...args) => new Color(...args, "hsi");
    input.format.hsi = require_hsi2rgb();
    input.autodetect.push({
      p: 2,
      test: (...args) => {
        args = unpack(args, "hsi");
        if (type(args) === "array" && args.length === 3) {
          return "hsi";
        }
      }
    });
  }
});

// node_modules/chroma-js/src/io/hsl/index.js
var require_hsl = __commonJS({
  "node_modules/chroma-js/src/io/hsl/index.js"() {
    var { unpack, type } = require_utils();
    var chroma7 = require_chroma();
    var Color = require_Color();
    var input = require_input();
    var rgb2hsl = require_rgb2hsl();
    Color.prototype.hsl = function() {
      return rgb2hsl(this._rgb);
    };
    chroma7.hsl = (...args) => new Color(...args, "hsl");
    input.format.hsl = require_hsl2rgb();
    input.autodetect.push({
      p: 2,
      test: (...args) => {
        args = unpack(args, "hsl");
        if (type(args) === "array" && args.length === 3) {
          return "hsl";
        }
      }
    });
  }
});

// node_modules/chroma-js/src/io/hsv/rgb2hsv.js
var require_rgb2hsv = __commonJS({
  "node_modules/chroma-js/src/io/hsv/rgb2hsv.js"(exports, module) {
    var { unpack } = require_utils();
    var { min, max } = Math;
    var rgb2hsl = (...args) => {
      args = unpack(args, "rgb");
      let [r, g, b] = args;
      const min_ = min(r, g, b);
      const max_ = max(r, g, b);
      const delta = max_ - min_;
      let h, s, v;
      v = max_ / 255;
      if (max_ === 0) {
        h = Number.NaN;
        s = 0;
      } else {
        s = delta / max_;
        if (r === max_)
          h = (g - b) / delta;
        if (g === max_)
          h = 2 + (b - r) / delta;
        if (b === max_)
          h = 4 + (r - g) / delta;
        h *= 60;
        if (h < 0)
          h += 360;
      }
      return [h, s, v];
    };
    module.exports = rgb2hsl;
  }
});

// node_modules/chroma-js/src/io/hsv/hsv2rgb.js
var require_hsv2rgb = __commonJS({
  "node_modules/chroma-js/src/io/hsv/hsv2rgb.js"(exports, module) {
    var { unpack } = require_utils();
    var { floor } = Math;
    var hsv2rgb = (...args) => {
      args = unpack(args, "hsv");
      let [h, s, v] = args;
      let r, g, b;
      v *= 255;
      if (s === 0) {
        r = g = b = v;
      } else {
        if (h === 360)
          h = 0;
        if (h > 360)
          h -= 360;
        if (h < 0)
          h += 360;
        h /= 60;
        const i = floor(h);
        const f = h - i;
        const p = v * (1 - s);
        const q = v * (1 - s * f);
        const t = v * (1 - s * (1 - f));
        switch (i) {
          case 0:
            [r, g, b] = [v, t, p];
            break;
          case 1:
            [r, g, b] = [q, v, p];
            break;
          case 2:
            [r, g, b] = [p, v, t];
            break;
          case 3:
            [r, g, b] = [p, q, v];
            break;
          case 4:
            [r, g, b] = [t, p, v];
            break;
          case 5:
            [r, g, b] = [v, p, q];
            break;
        }
      }
      return [r, g, b, args.length > 3 ? args[3] : 1];
    };
    module.exports = hsv2rgb;
  }
});

// node_modules/chroma-js/src/io/hsv/index.js
var require_hsv = __commonJS({
  "node_modules/chroma-js/src/io/hsv/index.js"() {
    var { unpack, type } = require_utils();
    var chroma7 = require_chroma();
    var Color = require_Color();
    var input = require_input();
    var rgb2hsv = require_rgb2hsv();
    Color.prototype.hsv = function() {
      return rgb2hsv(this._rgb);
    };
    chroma7.hsv = (...args) => new Color(...args, "hsv");
    input.format.hsv = require_hsv2rgb();
    input.autodetect.push({
      p: 2,
      test: (...args) => {
        args = unpack(args, "hsv");
        if (type(args) === "array" && args.length === 3) {
          return "hsv";
        }
      }
    });
  }
});

// node_modules/chroma-js/src/io/lab/lab-constants.js
var require_lab_constants = __commonJS({
  "node_modules/chroma-js/src/io/lab/lab-constants.js"(exports, module) {
    module.exports = {
      // Corresponds roughly to RGB brighter/darker
      Kn: 18,
      // D65 standard referent
      Xn: 0.95047,
      Yn: 1,
      Zn: 1.08883,
      t0: 0.137931034,
      // 4 / 29
      t1: 0.206896552,
      // 6 / 29
      t2: 0.12841855,
      // 3 * t1 * t1
      t3: 8856452e-9
      // t1 * t1 * t1
    };
  }
});

// node_modules/chroma-js/src/io/lab/rgb2lab.js
var require_rgb2lab = __commonJS({
  "node_modules/chroma-js/src/io/lab/rgb2lab.js"(exports, module) {
    var LAB_CONSTANTS = require_lab_constants();
    var { unpack } = require_utils();
    var { pow } = Math;
    var rgb2lab = (...args) => {
      const [r, g, b] = unpack(args, "rgb");
      const [x, y, z] = rgb2xyz(r, g, b);
      const l = 116 * y - 16;
      return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
    };
    var rgb_xyz = (r) => {
      if ((r /= 255) <= 0.04045)
        return r / 12.92;
      return pow((r + 0.055) / 1.055, 2.4);
    };
    var xyz_lab = (t) => {
      if (t > LAB_CONSTANTS.t3)
        return pow(t, 1 / 3);
      return t / LAB_CONSTANTS.t2 + LAB_CONSTANTS.t0;
    };
    var rgb2xyz = (r, g, b) => {
      r = rgb_xyz(r);
      g = rgb_xyz(g);
      b = rgb_xyz(b);
      const x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS.Xn);
      const y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.072175 * b) / LAB_CONSTANTS.Yn);
      const z = xyz_lab((0.0193339 * r + 0.119192 * g + 0.9503041 * b) / LAB_CONSTANTS.Zn);
      return [x, y, z];
    };
    module.exports = rgb2lab;
  }
});

// node_modules/chroma-js/src/io/lab/lab2rgb.js
var require_lab2rgb = __commonJS({
  "node_modules/chroma-js/src/io/lab/lab2rgb.js"(exports, module) {
    var LAB_CONSTANTS = require_lab_constants();
    var { unpack } = require_utils();
    var { pow } = Math;
    var lab2rgb = (...args) => {
      args = unpack(args, "lab");
      const [l, a, b] = args;
      let x, y, z, r, g, b_;
      y = (l + 16) / 116;
      x = isNaN(a) ? y : y + a / 500;
      z = isNaN(b) ? y : y - b / 200;
      y = LAB_CONSTANTS.Yn * lab_xyz(y);
      x = LAB_CONSTANTS.Xn * lab_xyz(x);
      z = LAB_CONSTANTS.Zn * lab_xyz(z);
      r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
      g = xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z);
      b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
      return [r, g, b_, args.length > 3 ? args[3] : 1];
    };
    var xyz_rgb = (r) => {
      return 255 * (r <= 304e-5 ? 12.92 * r : 1.055 * pow(r, 1 / 2.4) - 0.055);
    };
    var lab_xyz = (t) => {
      return t > LAB_CONSTANTS.t1 ? t * t * t : LAB_CONSTANTS.t2 * (t - LAB_CONSTANTS.t0);
    };
    module.exports = lab2rgb;
  }
});

// node_modules/chroma-js/src/io/lab/index.js
var require_lab = __commonJS({
  "node_modules/chroma-js/src/io/lab/index.js"() {
    var { unpack, type } = require_utils();
    var chroma7 = require_chroma();
    var Color = require_Color();
    var input = require_input();
    var rgb2lab = require_rgb2lab();
    Color.prototype.lab = function() {
      return rgb2lab(this._rgb);
    };
    chroma7.lab = (...args) => new Color(...args, "lab");
    input.format.lab = require_lab2rgb();
    input.autodetect.push({
      p: 2,
      test: (...args) => {
        args = unpack(args, "lab");
        if (type(args) === "array" && args.length === 3) {
          return "lab";
        }
      }
    });
  }
});

// node_modules/chroma-js/src/io/lch/lab2lch.js
var require_lab2lch = __commonJS({
  "node_modules/chroma-js/src/io/lch/lab2lch.js"(exports, module) {
    var { unpack, RAD2DEG } = require_utils();
    var { sqrt, atan2, round } = Math;
    var lab2lch = (...args) => {
      const [l, a, b] = unpack(args, "lab");
      const c = sqrt(a * a + b * b);
      let h = (atan2(b, a) * RAD2DEG + 360) % 360;
      if (round(c * 1e4) === 0)
        h = Number.NaN;
      return [l, c, h];
    };
    module.exports = lab2lch;
  }
});

// node_modules/chroma-js/src/io/lch/rgb2lch.js
var require_rgb2lch = __commonJS({
  "node_modules/chroma-js/src/io/lch/rgb2lch.js"(exports, module) {
    var { unpack } = require_utils();
    var rgb2lab = require_rgb2lab();
    var lab2lch = require_lab2lch();
    var rgb2lch = (...args) => {
      const [r, g, b] = unpack(args, "rgb");
      const [l, a, b_] = rgb2lab(r, g, b);
      return lab2lch(l, a, b_);
    };
    module.exports = rgb2lch;
  }
});

// node_modules/chroma-js/src/io/lch/lch2lab.js
var require_lch2lab = __commonJS({
  "node_modules/chroma-js/src/io/lch/lch2lab.js"(exports, module) {
    var { unpack, DEG2RAD } = require_utils();
    var { sin, cos } = Math;
    var lch2lab = (...args) => {
      let [l, c, h] = unpack(args, "lch");
      if (isNaN(h))
        h = 0;
      h = h * DEG2RAD;
      return [l, cos(h) * c, sin(h) * c];
    };
    module.exports = lch2lab;
  }
});

// node_modules/chroma-js/src/io/lch/lch2rgb.js
var require_lch2rgb = __commonJS({
  "node_modules/chroma-js/src/io/lch/lch2rgb.js"(exports, module) {
    var { unpack } = require_utils();
    var lch2lab = require_lch2lab();
    var lab2rgb = require_lab2rgb();
    var lch2rgb = (...args) => {
      args = unpack(args, "lch");
      const [l, c, h] = args;
      const [L, a, b_] = lch2lab(l, c, h);
      const [r, g, b] = lab2rgb(L, a, b_);
      return [r, g, b, args.length > 3 ? args[3] : 1];
    };
    module.exports = lch2rgb;
  }
});

// node_modules/chroma-js/src/io/lch/hcl2rgb.js
var require_hcl2rgb = __commonJS({
  "node_modules/chroma-js/src/io/lch/hcl2rgb.js"(exports, module) {
    var { unpack } = require_utils();
    var lch2rgb = require_lch2rgb();
    var hcl2rgb = (...args) => {
      const hcl = unpack(args, "hcl").reverse();
      return lch2rgb(...hcl);
    };
    module.exports = hcl2rgb;
  }
});

// node_modules/chroma-js/src/io/lch/index.js
var require_lch = __commonJS({
  "node_modules/chroma-js/src/io/lch/index.js"() {
    var { unpack, type } = require_utils();
    var chroma7 = require_chroma();
    var Color = require_Color();
    var input = require_input();
    var rgb2lch = require_rgb2lch();
    Color.prototype.lch = function() {
      return rgb2lch(this._rgb);
    };
    Color.prototype.hcl = function() {
      return rgb2lch(this._rgb).reverse();
    };
    chroma7.lch = (...args) => new Color(...args, "lch");
    chroma7.hcl = (...args) => new Color(...args, "hcl");
    input.format.lch = require_lch2rgb();
    input.format.hcl = require_hcl2rgb();
    ["lch", "hcl"].forEach((m) => input.autodetect.push({
      p: 2,
      test: (...args) => {
        args = unpack(args, m);
        if (type(args) === "array" && args.length === 3) {
          return m;
        }
      }
    }));
  }
});

// node_modules/chroma-js/src/colors/w3cx11.js
var require_w3cx11 = __commonJS({
  "node_modules/chroma-js/src/colors/w3cx11.js"(exports, module) {
    var w3cx11 = {
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedalmond: "#ffebcd",
      blue: "#0000ff",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflower: "#6495ed",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkgrey: "#a9a9a9",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkslategrey: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      gold: "#ffd700",
      goldenrod: "#daa520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#adff2f",
      grey: "#808080",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      indianred: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      laserlemon: "#ffff54",
      lavender: "#e6e6fa",
      lavenderblush: "#fff0f5",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrod: "#fafad2",
      lightgoldenrodyellow: "#fafad2",
      lightgray: "#d3d3d3",
      lightgreen: "#90ee90",
      lightgrey: "#d3d3d3",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      maroon2: "#7f0000",
      maroon3: "#b03060",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370db",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      navy: "#000080",
      oldlace: "#fdf5e6",
      olive: "#808000",
      olivedrab: "#6b8e23",
      orange: "#ffa500",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#db7093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      purple: "#800080",
      purple2: "#7f007f",
      purple3: "#a020f0",
      rebeccapurple: "#663399",
      red: "#ff0000",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whitesmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowgreen: "#9acd32"
    };
    module.exports = w3cx11;
  }
});

// node_modules/chroma-js/src/io/named/index.js
var require_named = __commonJS({
  "node_modules/chroma-js/src/io/named/index.js"() {
    var Color = require_Color();
    var input = require_input();
    var { type } = require_utils();
    var w3cx11 = require_w3cx11();
    var hex2rgb = require_hex2rgb();
    var rgb2hex = require_rgb2hex();
    Color.prototype.name = function() {
      const hex = rgb2hex(this._rgb, "rgb");
      for (let n of Object.keys(w3cx11)) {
        if (w3cx11[n] === hex)
          return n.toLowerCase();
      }
      return hex;
    };
    input.format.named = (name) => {
      name = name.toLowerCase();
      if (w3cx11[name])
        return hex2rgb(w3cx11[name]);
      throw new Error("unknown color name: " + name);
    };
    input.autodetect.push({
      p: 5,
      test: (h, ...rest) => {
        if (!rest.length && type(h) === "string" && w3cx11[h.toLowerCase()]) {
          return "named";
        }
      }
    });
  }
});

// node_modules/chroma-js/src/io/num/rgb2num.js
var require_rgb2num = __commonJS({
  "node_modules/chroma-js/src/io/num/rgb2num.js"(exports, module) {
    var { unpack } = require_utils();
    var rgb2num = (...args) => {
      const [r, g, b] = unpack(args, "rgb");
      return (r << 16) + (g << 8) + b;
    };
    module.exports = rgb2num;
  }
});

// node_modules/chroma-js/src/io/num/num2rgb.js
var require_num2rgb = __commonJS({
  "node_modules/chroma-js/src/io/num/num2rgb.js"(exports, module) {
    var { type } = require_utils();
    var num2rgb = (num) => {
      if (type(num) == "number" && num >= 0 && num <= 16777215) {
        const r = num >> 16;
        const g = num >> 8 & 255;
        const b = num & 255;
        return [r, g, b, 1];
      }
      throw new Error("unknown num color: " + num);
    };
    module.exports = num2rgb;
  }
});

// node_modules/chroma-js/src/io/num/index.js
var require_num = __commonJS({
  "node_modules/chroma-js/src/io/num/index.js"() {
    var chroma7 = require_chroma();
    var Color = require_Color();
    var input = require_input();
    var { type } = require_utils();
    var rgb2num = require_rgb2num();
    Color.prototype.num = function() {
      return rgb2num(this._rgb);
    };
    chroma7.num = (...args) => new Color(...args, "num");
    input.format.num = require_num2rgb();
    input.autodetect.push({
      p: 5,
      test: (...args) => {
        if (args.length === 1 && type(args[0]) === "number" && args[0] >= 0 && args[0] <= 16777215) {
          return "num";
        }
      }
    });
  }
});

// node_modules/chroma-js/src/io/rgb/index.js
var require_rgb = __commonJS({
  "node_modules/chroma-js/src/io/rgb/index.js"() {
    var chroma7 = require_chroma();
    var Color = require_Color();
    var input = require_input();
    var { unpack, type } = require_utils();
    var { round } = Math;
    Color.prototype.rgb = function(rnd = true) {
      if (rnd === false)
        return this._rgb.slice(0, 3);
      return this._rgb.slice(0, 3).map(round);
    };
    Color.prototype.rgba = function(rnd = true) {
      return this._rgb.slice(0, 4).map((v, i) => {
        return i < 3 ? rnd === false ? v : round(v) : v;
      });
    };
    chroma7.rgb = (...args) => new Color(...args, "rgb");
    input.format.rgb = (...args) => {
      const rgba = unpack(args, "rgba");
      if (rgba[3] === void 0)
        rgba[3] = 1;
      return rgba;
    };
    input.autodetect.push({
      p: 3,
      test: (...args) => {
        args = unpack(args, "rgba");
        if (type(args) === "array" && (args.length === 3 || args.length === 4 && type(args[3]) == "number" && args[3] >= 0 && args[3] <= 1)) {
          return "rgb";
        }
      }
    });
  }
});

// node_modules/chroma-js/src/io/temp/temperature2rgb.js
var require_temperature2rgb = __commonJS({
  "node_modules/chroma-js/src/io/temp/temperature2rgb.js"(exports, module) {
    var { log } = Math;
    var temperature2rgb = (kelvin) => {
      const temp = kelvin / 100;
      let r, g, b;
      if (temp < 66) {
        r = 255;
        g = temp < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
        b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
      } else {
        r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
        g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
        b = 255;
      }
      return [r, g, b, 1];
    };
    module.exports = temperature2rgb;
  }
});

// node_modules/chroma-js/src/io/temp/rgb2temperature.js
var require_rgb2temperature = __commonJS({
  "node_modules/chroma-js/src/io/temp/rgb2temperature.js"(exports, module) {
    var temperature2rgb = require_temperature2rgb();
    var { unpack } = require_utils();
    var { round } = Math;
    var rgb2temperature = (...args) => {
      const rgb = unpack(args, "rgb");
      const r = rgb[0], b = rgb[2];
      let minTemp = 1e3;
      let maxTemp = 4e4;
      const eps = 0.4;
      let temp;
      while (maxTemp - minTemp > eps) {
        temp = (maxTemp + minTemp) * 0.5;
        const rgb2 = temperature2rgb(temp);
        if (rgb2[2] / rgb2[0] >= b / r) {
          maxTemp = temp;
        } else {
          minTemp = temp;
        }
      }
      return round(temp);
    };
    module.exports = rgb2temperature;
  }
});

// node_modules/chroma-js/src/io/temp/index.js
var require_temp = __commonJS({
  "node_modules/chroma-js/src/io/temp/index.js"() {
    var chroma7 = require_chroma();
    var Color = require_Color();
    var input = require_input();
    var rgb2temperature = require_rgb2temperature();
    Color.prototype.temp = Color.prototype.kelvin = Color.prototype.temperature = function() {
      return rgb2temperature(this._rgb);
    };
    chroma7.temp = chroma7.kelvin = chroma7.temperature = (...args) => new Color(...args, "temp");
    input.format.temp = input.format.kelvin = input.format.temperature = require_temperature2rgb();
  }
});

// node_modules/chroma-js/src/io/oklab/rgb2oklab.js
var require_rgb2oklab = __commonJS({
  "node_modules/chroma-js/src/io/oklab/rgb2oklab.js"(exports, module) {
    var { unpack } = require_utils();
    var { cbrt, pow, sign } = Math;
    var rgb2oklab = (...args) => {
      const [r, g, b] = unpack(args, "rgb");
      const [lr, lg, lb] = [rgb2lrgb(r / 255), rgb2lrgb(g / 255), rgb2lrgb(b / 255)];
      const l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
      const m = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
      const s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
      return [
        0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
        1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
      ];
    };
    module.exports = rgb2oklab;
    function rgb2lrgb(c) {
      const abs = Math.abs(c);
      if (abs < 0.04045) {
        return c / 12.92;
      }
      return (sign(c) || 1) * pow((abs + 0.055) / 1.055, 2.4);
    }
  }
});

// node_modules/chroma-js/src/io/oklab/oklab2rgb.js
var require_oklab2rgb = __commonJS({
  "node_modules/chroma-js/src/io/oklab/oklab2rgb.js"(exports, module) {
    var { unpack } = require_utils();
    var { pow, sign } = Math;
    var oklab2rgb = (...args) => {
      args = unpack(args, "lab");
      const [L, a, b] = args;
      const l = pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
      const m = pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
      const s = pow(L - 0.0894841775 * a - 1.291485548 * b, 3);
      return [
        255 * lrgb2rgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
        255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
        255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
        args.length > 3 ? args[3] : 1
      ];
    };
    module.exports = oklab2rgb;
    function lrgb2rgb(c) {
      const abs = Math.abs(c);
      if (abs > 31308e-7) {
        return (sign(c) || 1) * (1.055 * pow(abs, 1 / 2.4) - 0.055);
      }
      return c * 12.92;
    }
  }
});

// node_modules/chroma-js/src/io/oklab/index.js
var require_oklab = __commonJS({
  "node_modules/chroma-js/src/io/oklab/index.js"() {
    var { unpack, type } = require_utils();
    var chroma7 = require_chroma();
    var Color = require_Color();
    var input = require_input();
    var rgb2oklab = require_rgb2oklab();
    Color.prototype.oklab = function() {
      return rgb2oklab(this._rgb);
    };
    chroma7.oklab = (...args) => new Color(...args, "oklab");
    input.format.oklab = require_oklab2rgb();
    input.autodetect.push({
      p: 3,
      test: (...args) => {
        args = unpack(args, "oklab");
        if (type(args) === "array" && args.length === 3) {
          return "oklab";
        }
      }
    });
  }
});

// node_modules/chroma-js/src/io/oklch/rgb2oklch.js
var require_rgb2oklch = __commonJS({
  "node_modules/chroma-js/src/io/oklch/rgb2oklch.js"(exports, module) {
    var { unpack } = require_utils();
    var rgb2oklab = require_rgb2oklab();
    var lab2lch = require_lab2lch();
    var rgb2oklch = (...args) => {
      const [r, g, b] = unpack(args, "rgb");
      const [l, a, b_] = rgb2oklab(r, g, b);
      return lab2lch(l, a, b_);
    };
    module.exports = rgb2oklch;
  }
});

// node_modules/chroma-js/src/io/oklch/oklch2rgb.js
var require_oklch2rgb = __commonJS({
  "node_modules/chroma-js/src/io/oklch/oklch2rgb.js"(exports, module) {
    var { unpack } = require_utils();
    var lch2lab = require_lch2lab();
    var oklab2rgb = require_oklab2rgb();
    var oklch2rgb = (...args) => {
      args = unpack(args, "lch");
      const [l, c, h] = args;
      const [L, a, b_] = lch2lab(l, c, h);
      const [r, g, b] = oklab2rgb(L, a, b_);
      return [r, g, b, args.length > 3 ? args[3] : 1];
    };
    module.exports = oklch2rgb;
  }
});

// node_modules/chroma-js/src/io/oklch/index.js
var require_oklch = __commonJS({
  "node_modules/chroma-js/src/io/oklch/index.js"() {
    var { unpack, type } = require_utils();
    var chroma7 = require_chroma();
    var Color = require_Color();
    var input = require_input();
    var rgb2oklch = require_rgb2oklch();
    Color.prototype.oklch = function() {
      return rgb2oklch(this._rgb);
    };
    chroma7.oklch = (...args) => new Color(...args, "oklch");
    input.format.oklch = require_oklch2rgb();
    input.autodetect.push({
      p: 3,
      test: (...args) => {
        args = unpack(args, "oklch");
        if (type(args) === "array" && args.length === 3) {
          return "oklch";
        }
      }
    });
  }
});

// node_modules/chroma-js/src/ops/alpha.js
var require_alpha = __commonJS({
  "node_modules/chroma-js/src/ops/alpha.js"() {
    var Color = require_Color();
    var { type } = require_utils();
    Color.prototype.alpha = function(a, mutate = false) {
      if (a !== void 0 && type(a) === "number") {
        if (mutate) {
          this._rgb[3] = a;
          return this;
        }
        return new Color([this._rgb[0], this._rgb[1], this._rgb[2], a], "rgb");
      }
      return this._rgb[3];
    };
  }
});

// node_modules/chroma-js/src/ops/clipped.js
var require_clipped = __commonJS({
  "node_modules/chroma-js/src/ops/clipped.js"() {
    var Color = require_Color();
    Color.prototype.clipped = function() {
      return this._rgb._clipped || false;
    };
  }
});

// node_modules/chroma-js/src/ops/darken.js
var require_darken = __commonJS({
  "node_modules/chroma-js/src/ops/darken.js"() {
    require_lab();
    var Color = require_Color();
    var LAB_CONSTANTS = require_lab_constants();
    Color.prototype.darken = function(amount = 1) {
      const me = this;
      const lab = me.lab();
      lab[0] -= LAB_CONSTANTS.Kn * amount;
      return new Color(lab, "lab").alpha(me.alpha(), true);
    };
    Color.prototype.brighten = function(amount = 1) {
      return this.darken(-amount);
    };
    Color.prototype.darker = Color.prototype.darken;
    Color.prototype.brighter = Color.prototype.brighten;
  }
});

// node_modules/chroma-js/src/ops/get.js
var require_get = __commonJS({
  "node_modules/chroma-js/src/ops/get.js"() {
    var Color = require_Color();
    Color.prototype.get = function(mc) {
      const [mode, channel] = mc.split(".");
      const src = this[mode]();
      if (channel) {
        const i = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
        if (i > -1)
          return src[i];
        throw new Error(`unknown channel ${channel} in mode ${mode}`);
      } else {
        return src;
      }
    };
  }
});

// node_modules/chroma-js/src/ops/luminance.js
var require_luminance = __commonJS({
  "node_modules/chroma-js/src/ops/luminance.js"() {
    var Color = require_Color();
    var { type } = require_utils();
    var { pow } = Math;
    var EPS = 1e-7;
    var MAX_ITER = 20;
    Color.prototype.luminance = function(lum) {
      if (lum !== void 0 && type(lum) === "number") {
        if (lum === 0) {
          return new Color([0, 0, 0, this._rgb[3]], "rgb");
        }
        if (lum === 1) {
          return new Color([255, 255, 255, this._rgb[3]], "rgb");
        }
        let cur_lum = this.luminance();
        let mode = "rgb";
        let max_iter = MAX_ITER;
        const test = (low, high) => {
          const mid = low.interpolate(high, 0.5, mode);
          const lm = mid.luminance();
          if (Math.abs(lum - lm) < EPS || !max_iter--) {
            return mid;
          }
          return lm > lum ? test(low, mid) : test(mid, high);
        };
        const rgb = (cur_lum > lum ? test(new Color([0, 0, 0]), this) : test(this, new Color([255, 255, 255]))).rgb();
        return new Color([...rgb, this._rgb[3]]);
      }
      return rgb2luminance(...this._rgb.slice(0, 3));
    };
    var rgb2luminance = (r, g, b) => {
      r = luminance_x(r);
      g = luminance_x(g);
      b = luminance_x(b);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    var luminance_x = (x) => {
      x /= 255;
      return x <= 0.03928 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);
    };
  }
});

// node_modules/chroma-js/src/interpolator/index.js
var require_interpolator = __commonJS({
  "node_modules/chroma-js/src/interpolator/index.js"(exports, module) {
    module.exports = {};
  }
});

// node_modules/chroma-js/src/generator/mix.js
var require_mix = __commonJS({
  "node_modules/chroma-js/src/generator/mix.js"(exports, module) {
    var Color = require_Color();
    var { type } = require_utils();
    var interpolator = require_interpolator();
    module.exports = (col1, col2, f = 0.5, ...rest) => {
      let mode = rest[0] || "lrgb";
      if (!interpolator[mode] && !rest.length) {
        mode = Object.keys(interpolator)[0];
      }
      if (!interpolator[mode]) {
        throw new Error(`interpolation mode ${mode} is not defined`);
      }
      if (type(col1) !== "object")
        col1 = new Color(col1);
      if (type(col2) !== "object")
        col2 = new Color(col2);
      return interpolator[mode](col1, col2, f).alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
    };
  }
});

// node_modules/chroma-js/src/ops/mix.js
var require_mix2 = __commonJS({
  "node_modules/chroma-js/src/ops/mix.js"() {
    var Color = require_Color();
    var mix = require_mix();
    Color.prototype.mix = Color.prototype.interpolate = function(col2, f = 0.5, ...rest) {
      return mix(this, col2, f, ...rest);
    };
  }
});

// node_modules/chroma-js/src/ops/premultiply.js
var require_premultiply = __commonJS({
  "node_modules/chroma-js/src/ops/premultiply.js"() {
    var Color = require_Color();
    Color.prototype.premultiply = function(mutate = false) {
      const rgb = this._rgb;
      const a = rgb[3];
      if (mutate) {
        this._rgb = [rgb[0] * a, rgb[1] * a, rgb[2] * a, a];
        return this;
      } else {
        return new Color([rgb[0] * a, rgb[1] * a, rgb[2] * a, a], "rgb");
      }
    };
  }
});

// node_modules/chroma-js/src/ops/saturate.js
var require_saturate = __commonJS({
  "node_modules/chroma-js/src/ops/saturate.js"() {
    require_lch();
    var Color = require_Color();
    var LAB_CONSTANTS = require_lab_constants();
    Color.prototype.saturate = function(amount = 1) {
      const me = this;
      const lch = me.lch();
      lch[1] += LAB_CONSTANTS.Kn * amount;
      if (lch[1] < 0)
        lch[1] = 0;
      return new Color(lch, "lch").alpha(me.alpha(), true);
    };
    Color.prototype.desaturate = function(amount = 1) {
      return this.saturate(-amount);
    };
  }
});

// node_modules/chroma-js/src/ops/set.js
var require_set = __commonJS({
  "node_modules/chroma-js/src/ops/set.js"() {
    var Color = require_Color();
    var { type } = require_utils();
    Color.prototype.set = function(mc, value, mutate = false) {
      const [mode, channel] = mc.split(".");
      const src = this[mode]();
      if (channel) {
        const i = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
        if (i > -1) {
          if (type(value) == "string") {
            switch (value.charAt(0)) {
              case "+":
                src[i] += +value;
                break;
              case "-":
                src[i] += +value;
                break;
              case "*":
                src[i] *= +value.substr(1);
                break;
              case "/":
                src[i] /= +value.substr(1);
                break;
              default:
                src[i] = +value;
            }
          } else if (type(value) === "number") {
            src[i] = value;
          } else {
            throw new Error(`unsupported value for Color.set`);
          }
          const out = new Color(src, mode);
          if (mutate) {
            this._rgb = out._rgb;
            return this;
          }
          return out;
        }
        throw new Error(`unknown channel ${channel} in mode ${mode}`);
      } else {
        return src;
      }
    };
  }
});

// node_modules/chroma-js/src/interpolator/rgb.js
var require_rgb2 = __commonJS({
  "node_modules/chroma-js/src/interpolator/rgb.js"(exports, module) {
    var Color = require_Color();
    var rgb = (col1, col2, f) => {
      const xyz0 = col1._rgb;
      const xyz1 = col2._rgb;
      return new Color(
        xyz0[0] + f * (xyz1[0] - xyz0[0]),
        xyz0[1] + f * (xyz1[1] - xyz0[1]),
        xyz0[2] + f * (xyz1[2] - xyz0[2]),
        "rgb"
      );
    };
    require_interpolator().rgb = rgb;
    module.exports = rgb;
  }
});

// node_modules/chroma-js/src/interpolator/lrgb.js
var require_lrgb = __commonJS({
  "node_modules/chroma-js/src/interpolator/lrgb.js"(exports, module) {
    var Color = require_Color();
    var { sqrt, pow } = Math;
    var lrgb = (col1, col2, f) => {
      const [x1, y1, z1] = col1._rgb;
      const [x2, y2, z2] = col2._rgb;
      return new Color(
        sqrt(pow(x1, 2) * (1 - f) + pow(x2, 2) * f),
        sqrt(pow(y1, 2) * (1 - f) + pow(y2, 2) * f),
        sqrt(pow(z1, 2) * (1 - f) + pow(z2, 2) * f),
        "rgb"
      );
    };
    require_interpolator().lrgb = lrgb;
    module.exports = lrgb;
  }
});

// node_modules/chroma-js/src/interpolator/lab.js
var require_lab2 = __commonJS({
  "node_modules/chroma-js/src/interpolator/lab.js"(exports, module) {
    require_lab();
    var Color = require_Color();
    var lab = (col1, col2, f) => {
      const xyz0 = col1.lab();
      const xyz1 = col2.lab();
      return new Color(
        xyz0[0] + f * (xyz1[0] - xyz0[0]),
        xyz0[1] + f * (xyz1[1] - xyz0[1]),
        xyz0[2] + f * (xyz1[2] - xyz0[2]),
        "lab"
      );
    };
    require_interpolator().lab = lab;
    module.exports = lab;
  }
});

// node_modules/chroma-js/src/interpolator/_hsx.js
var require_hsx = __commonJS({
  "node_modules/chroma-js/src/interpolator/_hsx.js"(exports, module) {
    var Color = require_Color();
    module.exports = (col1, col2, f, m) => {
      let xyz0, xyz1;
      if (m === "hsl") {
        xyz0 = col1.hsl();
        xyz1 = col2.hsl();
      } else if (m === "hsv") {
        xyz0 = col1.hsv();
        xyz1 = col2.hsv();
      } else if (m === "hcg") {
        xyz0 = col1.hcg();
        xyz1 = col2.hcg();
      } else if (m === "hsi") {
        xyz0 = col1.hsi();
        xyz1 = col2.hsi();
      } else if (m === "lch" || m === "hcl") {
        m = "hcl";
        xyz0 = col1.hcl();
        xyz1 = col2.hcl();
      } else if (m === "oklch") {
        xyz0 = col1.oklch().reverse();
        xyz1 = col2.oklch().reverse();
      }
      let hue0, hue1, sat0, sat1, lbv0, lbv1;
      if (m.substr(0, 1) === "h" || m === "oklch") {
        [hue0, sat0, lbv0] = xyz0;
        [hue1, sat1, lbv1] = xyz1;
      }
      let sat, hue, lbv, dh;
      if (!isNaN(hue0) && !isNaN(hue1)) {
        if (hue1 > hue0 && hue1 - hue0 > 180) {
          dh = hue1 - (hue0 + 360);
        } else if (hue1 < hue0 && hue0 - hue1 > 180) {
          dh = hue1 + 360 - hue0;
        } else {
          dh = hue1 - hue0;
        }
        hue = hue0 + f * dh;
      } else if (!isNaN(hue0)) {
        hue = hue0;
        if ((lbv1 == 1 || lbv1 == 0) && m != "hsv")
          sat = sat0;
      } else if (!isNaN(hue1)) {
        hue = hue1;
        if ((lbv0 == 1 || lbv0 == 0) && m != "hsv")
          sat = sat1;
      } else {
        hue = Number.NaN;
      }
      if (sat === void 0)
        sat = sat0 + f * (sat1 - sat0);
      lbv = lbv0 + f * (lbv1 - lbv0);
      return m === "oklch" ? new Color([lbv, sat, hue], m) : new Color([hue, sat, lbv], m);
    };
  }
});

// node_modules/chroma-js/src/interpolator/lch.js
var require_lch2 = __commonJS({
  "node_modules/chroma-js/src/interpolator/lch.js"(exports, module) {
    require_lch();
    var interpolate_hsx = require_hsx();
    var lch = (col1, col2, f) => {
      return interpolate_hsx(col1, col2, f, "lch");
    };
    require_interpolator().lch = lch;
    require_interpolator().hcl = lch;
    module.exports = lch;
  }
});

// node_modules/chroma-js/src/interpolator/num.js
var require_num2 = __commonJS({
  "node_modules/chroma-js/src/interpolator/num.js"(exports, module) {
    require_num();
    var Color = require_Color();
    var num = (col1, col2, f) => {
      const c1 = col1.num();
      const c2 = col2.num();
      return new Color(c1 + f * (c2 - c1), "num");
    };
    require_interpolator().num = num;
    module.exports = num;
  }
});

// node_modules/chroma-js/src/interpolator/hcg.js
var require_hcg2 = __commonJS({
  "node_modules/chroma-js/src/interpolator/hcg.js"(exports, module) {
    require_hcg();
    var interpolate_hsx = require_hsx();
    var hcg = (col1, col2, f) => {
      return interpolate_hsx(col1, col2, f, "hcg");
    };
    require_interpolator().hcg = hcg;
    module.exports = hcg;
  }
});

// node_modules/chroma-js/src/interpolator/hsi.js
var require_hsi2 = __commonJS({
  "node_modules/chroma-js/src/interpolator/hsi.js"(exports, module) {
    require_hsi();
    var interpolate_hsx = require_hsx();
    var hsi = (col1, col2, f) => {
      return interpolate_hsx(col1, col2, f, "hsi");
    };
    require_interpolator().hsi = hsi;
    module.exports = hsi;
  }
});

// node_modules/chroma-js/src/interpolator/hsl.js
var require_hsl2 = __commonJS({
  "node_modules/chroma-js/src/interpolator/hsl.js"(exports, module) {
    require_hsl();
    var interpolate_hsx = require_hsx();
    var hsl = (col1, col2, f) => {
      return interpolate_hsx(col1, col2, f, "hsl");
    };
    require_interpolator().hsl = hsl;
    module.exports = hsl;
  }
});

// node_modules/chroma-js/src/interpolator/hsv.js
var require_hsv2 = __commonJS({
  "node_modules/chroma-js/src/interpolator/hsv.js"(exports, module) {
    require_hsv();
    var interpolate_hsx = require_hsx();
    var hsv = (col1, col2, f) => {
      return interpolate_hsx(col1, col2, f, "hsv");
    };
    require_interpolator().hsv = hsv;
    module.exports = hsv;
  }
});

// node_modules/chroma-js/src/interpolator/oklab.js
var require_oklab2 = __commonJS({
  "node_modules/chroma-js/src/interpolator/oklab.js"(exports, module) {
    require_oklab();
    var Color = require_Color();
    var oklab = (col1, col2, f) => {
      const xyz0 = col1.oklab();
      const xyz1 = col2.oklab();
      return new Color(
        xyz0[0] + f * (xyz1[0] - xyz0[0]),
        xyz0[1] + f * (xyz1[1] - xyz0[1]),
        xyz0[2] + f * (xyz1[2] - xyz0[2]),
        "oklab"
      );
    };
    require_interpolator().oklab = oklab;
    module.exports = oklab;
  }
});

// node_modules/chroma-js/src/interpolator/oklch.js
var require_oklch2 = __commonJS({
  "node_modules/chroma-js/src/interpolator/oklch.js"(exports, module) {
    require_lch();
    var interpolate_hsx = require_hsx();
    var oklch = (col1, col2, f) => {
      return interpolate_hsx(col1, col2, f, "oklch");
    };
    require_interpolator().oklch = oklch;
    module.exports = oklch;
  }
});

// node_modules/chroma-js/src/generator/average.js
var require_average = __commonJS({
  "node_modules/chroma-js/src/generator/average.js"(exports, module) {
    var Color = require_Color();
    var { clip_rgb } = require_utils();
    var { pow, sqrt, PI, cos, sin, atan2 } = Math;
    module.exports = (colors, mode = "lrgb", weights = null) => {
      const l = colors.length;
      if (!weights)
        weights = Array.from(new Array(l)).map(() => 1);
      const k = l / weights.reduce(function(a, b) {
        return a + b;
      });
      weights.forEach((w, i) => {
        weights[i] *= k;
      });
      colors = colors.map((c) => new Color(c));
      if (mode === "lrgb") {
        return _average_lrgb(colors, weights);
      }
      const first = colors.shift();
      const xyz = first.get(mode);
      const cnt = [];
      let dx = 0;
      let dy = 0;
      for (let i = 0; i < xyz.length; i++) {
        xyz[i] = (xyz[i] || 0) * weights[0];
        cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
        if (mode.charAt(i) === "h" && !isNaN(xyz[i])) {
          const A = xyz[i] / 180 * PI;
          dx += cos(A) * weights[0];
          dy += sin(A) * weights[0];
        }
      }
      let alpha = first.alpha() * weights[0];
      colors.forEach((c, ci) => {
        const xyz2 = c.get(mode);
        alpha += c.alpha() * weights[ci + 1];
        for (let i = 0; i < xyz.length; i++) {
          if (!isNaN(xyz2[i])) {
            cnt[i] += weights[ci + 1];
            if (mode.charAt(i) === "h") {
              const A = xyz2[i] / 180 * PI;
              dx += cos(A) * weights[ci + 1];
              dy += sin(A) * weights[ci + 1];
            } else {
              xyz[i] += xyz2[i] * weights[ci + 1];
            }
          }
        }
      });
      for (let i = 0; i < xyz.length; i++) {
        if (mode.charAt(i) === "h") {
          let A = atan2(dy / cnt[i], dx / cnt[i]) / PI * 180;
          while (A < 0)
            A += 360;
          while (A >= 360)
            A -= 360;
          xyz[i] = A;
        } else {
          xyz[i] = xyz[i] / cnt[i];
        }
      }
      alpha /= l;
      return new Color(xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
    };
    var _average_lrgb = (colors, weights) => {
      const l = colors.length;
      const xyz = [0, 0, 0, 0];
      for (let i = 0; i < colors.length; i++) {
        const col = colors[i];
        const f = weights[i] / l;
        const rgb = col._rgb;
        xyz[0] += pow(rgb[0], 2) * f;
        xyz[1] += pow(rgb[1], 2) * f;
        xyz[2] += pow(rgb[2], 2) * f;
        xyz[3] += rgb[3] * f;
      }
      xyz[0] = sqrt(xyz[0]);
      xyz[1] = sqrt(xyz[1]);
      xyz[2] = sqrt(xyz[2]);
      if (xyz[3] > 0.9999999)
        xyz[3] = 1;
      return new Color(clip_rgb(xyz));
    };
  }
});

// node_modules/chroma-js/src/generator/scale.js
var require_scale = __commonJS({
  "node_modules/chroma-js/src/generator/scale.js"(exports, module) {
    var chroma7 = require_chroma();
    var { type } = require_utils();
    var { pow } = Math;
    module.exports = function(colors) {
      let _mode = "rgb";
      let _nacol = chroma7("#ccc");
      let _spread = 0;
      let _domain = [0, 1];
      let _pos = [];
      let _padding = [0, 0];
      let _classes = false;
      let _colors = [];
      let _out = false;
      let _min = 0;
      let _max = 1;
      let _correctLightness = false;
      let _colorCache = {};
      let _useCache = true;
      let _gamma = 1;
      const setColors = function(colors2) {
        colors2 = colors2 || ["#fff", "#000"];
        if (colors2 && type(colors2) === "string" && chroma7.brewer && chroma7.brewer[colors2.toLowerCase()]) {
          colors2 = chroma7.brewer[colors2.toLowerCase()];
        }
        if (type(colors2) === "array") {
          if (colors2.length === 1) {
            colors2 = [colors2[0], colors2[0]];
          }
          colors2 = colors2.slice(0);
          for (let c = 0; c < colors2.length; c++) {
            colors2[c] = chroma7(colors2[c]);
          }
          _pos.length = 0;
          for (let c = 0; c < colors2.length; c++) {
            _pos.push(c / (colors2.length - 1));
          }
        }
        resetCache();
        return _colors = colors2;
      };
      const getClass = function(value) {
        if (_classes != null) {
          const n = _classes.length - 1;
          let i = 0;
          while (i < n && value >= _classes[i]) {
            i++;
          }
          return i - 1;
        }
        return 0;
      };
      let tMapLightness = (t) => t;
      let tMapDomain = (t) => t;
      const getColor = function(val, bypassMap) {
        let col, t;
        if (bypassMap == null) {
          bypassMap = false;
        }
        if (isNaN(val) || val === null) {
          return _nacol;
        }
        if (!bypassMap) {
          if (_classes && _classes.length > 2) {
            const c = getClass(val);
            t = c / (_classes.length - 2);
          } else if (_max !== _min) {
            t = (val - _min) / (_max - _min);
          } else {
            t = 1;
          }
        } else {
          t = val;
        }
        t = tMapDomain(t);
        if (!bypassMap) {
          t = tMapLightness(t);
        }
        if (_gamma !== 1) {
          t = pow(t, _gamma);
        }
        t = _padding[0] + t * (1 - _padding[0] - _padding[1]);
        t = Math.min(1, Math.max(0, t));
        const k = Math.floor(t * 1e4);
        if (_useCache && _colorCache[k]) {
          col = _colorCache[k];
        } else {
          if (type(_colors) === "array") {
            for (let i = 0; i < _pos.length; i++) {
              const p = _pos[i];
              if (t <= p) {
                col = _colors[i];
                break;
              }
              if (t >= p && i === _pos.length - 1) {
                col = _colors[i];
                break;
              }
              if (t > p && t < _pos[i + 1]) {
                t = (t - p) / (_pos[i + 1] - p);
                col = chroma7.interpolate(_colors[i], _colors[i + 1], t, _mode);
                break;
              }
            }
          } else if (type(_colors) === "function") {
            col = _colors(t);
          }
          if (_useCache) {
            _colorCache[k] = col;
          }
        }
        return col;
      };
      var resetCache = () => _colorCache = {};
      setColors(colors);
      const f = function(v) {
        const c = chroma7(getColor(v));
        if (_out && c[_out]) {
          return c[_out]();
        } else {
          return c;
        }
      };
      f.classes = function(classes) {
        if (classes != null) {
          if (type(classes) === "array") {
            _classes = classes;
            _domain = [classes[0], classes[classes.length - 1]];
          } else {
            const d = chroma7.analyze(_domain);
            if (classes === 0) {
              _classes = [d.min, d.max];
            } else {
              _classes = chroma7.limits(d, "e", classes);
            }
          }
          return f;
        }
        return _classes;
      };
      f.domain = function(domain) {
        if (!arguments.length) {
          return _domain;
        }
        _min = domain[0];
        _max = domain[domain.length - 1];
        _pos = [];
        const k = _colors.length;
        if (domain.length === k && _min !== _max) {
          for (let d of Array.from(domain)) {
            _pos.push((d - _min) / (_max - _min));
          }
        } else {
          for (let c = 0; c < k; c++) {
            _pos.push(c / (k - 1));
          }
          if (domain.length > 2) {
            const tOut = domain.map((d, i) => i / (domain.length - 1));
            const tBreaks = domain.map((d) => (d - _min) / (_max - _min));
            if (!tBreaks.every((val, i) => tOut[i] === val)) {
              tMapDomain = (t) => {
                if (t <= 0 || t >= 1)
                  return t;
                let i = 0;
                while (t >= tBreaks[i + 1])
                  i++;
                const f2 = (t - tBreaks[i]) / (tBreaks[i + 1] - tBreaks[i]);
                const out = tOut[i] + f2 * (tOut[i + 1] - tOut[i]);
                return out;
              };
            }
          }
        }
        _domain = [_min, _max];
        return f;
      };
      f.mode = function(_m) {
        if (!arguments.length) {
          return _mode;
        }
        _mode = _m;
        resetCache();
        return f;
      };
      f.range = function(colors2, _pos2) {
        setColors(colors2, _pos2);
        return f;
      };
      f.out = function(_o) {
        _out = _o;
        return f;
      };
      f.spread = function(val) {
        if (!arguments.length) {
          return _spread;
        }
        _spread = val;
        return f;
      };
      f.correctLightness = function(v) {
        if (v == null) {
          v = true;
        }
        _correctLightness = v;
        resetCache();
        if (_correctLightness) {
          tMapLightness = function(t) {
            const L0 = getColor(0, true).lab()[0];
            const L1 = getColor(1, true).lab()[0];
            const pol = L0 > L1;
            let L_actual = getColor(t, true).lab()[0];
            const L_ideal = L0 + (L1 - L0) * t;
            let L_diff = L_actual - L_ideal;
            let t0 = 0;
            let t1 = 1;
            let max_iter = 20;
            while (Math.abs(L_diff) > 0.01 && max_iter-- > 0) {
              (function() {
                if (pol) {
                  L_diff *= -1;
                }
                if (L_diff < 0) {
                  t0 = t;
                  t += (t1 - t) * 0.5;
                } else {
                  t1 = t;
                  t += (t0 - t) * 0.5;
                }
                L_actual = getColor(t, true).lab()[0];
                return L_diff = L_actual - L_ideal;
              })();
            }
            return t;
          };
        } else {
          tMapLightness = (t) => t;
        }
        return f;
      };
      f.padding = function(p) {
        if (p != null) {
          if (type(p) === "number") {
            p = [p, p];
          }
          _padding = p;
          return f;
        } else {
          return _padding;
        }
      };
      f.colors = function(numColors, out) {
        if (arguments.length < 2) {
          out = "hex";
        }
        let result = [];
        if (arguments.length === 0) {
          result = _colors.slice(0);
        } else if (numColors === 1) {
          result = [f(0.5)];
        } else if (numColors > 1) {
          const dm = _domain[0];
          const dd = _domain[1] - dm;
          result = __range__(0, numColors, false).map((i) => f(dm + i / (numColors - 1) * dd));
        } else {
          colors = [];
          let samples = [];
          if (_classes && _classes.length > 2) {
            for (let i = 1, end = _classes.length, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
              samples.push((_classes[i - 1] + _classes[i]) * 0.5);
            }
          } else {
            samples = _domain;
          }
          result = samples.map((v) => f(v));
        }
        if (chroma7[out]) {
          result = result.map((c) => c[out]());
        }
        return result;
      };
      f.cache = function(c) {
        if (c != null) {
          _useCache = c;
          return f;
        } else {
          return _useCache;
        }
      };
      f.gamma = function(g) {
        if (g != null) {
          _gamma = g;
          return f;
        } else {
          return _gamma;
        }
      };
      f.nodata = function(d) {
        if (d != null) {
          _nacol = chroma7(d);
          return f;
        } else {
          return _nacol;
        }
      };
      return f;
    };
    function __range__(left, right, inclusive) {
      let range = [];
      let ascending = left < right;
      let end = !inclusive ? right : ascending ? right + 1 : right - 1;
      for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
        range.push(i);
      }
      return range;
    }
  }
});

// node_modules/chroma-js/src/generator/bezier.js
var require_bezier = __commonJS({
  "node_modules/chroma-js/src/generator/bezier.js"(exports, module) {
    var Color = require_Color();
    require_lab();
    var scale = require_scale();
    var binom_row = function(n) {
      let row = [1, 1];
      for (let i = 1; i < n; i++) {
        let newrow = [1];
        for (let j = 1; j <= row.length; j++) {
          newrow[j] = (row[j] || 0) + row[j - 1];
        }
        row = newrow;
      }
      return row;
    };
    var bezier = function(colors) {
      let I, lab0, lab1, lab2;
      colors = colors.map((c) => new Color(c));
      if (colors.length === 2) {
        [lab0, lab1] = colors.map((c) => c.lab());
        I = function(t) {
          const lab = [0, 1, 2].map((i) => lab0[i] + t * (lab1[i] - lab0[i]));
          return new Color(lab, "lab");
        };
      } else if (colors.length === 3) {
        [lab0, lab1, lab2] = colors.map((c) => c.lab());
        I = function(t) {
          const lab = [0, 1, 2].map((i) => (1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab2[i]);
          return new Color(lab, "lab");
        };
      } else if (colors.length === 4) {
        let lab3;
        [lab0, lab1, lab2, lab3] = colors.map((c) => c.lab());
        I = function(t) {
          const lab = [0, 1, 2].map((i) => (1 - t) * (1 - t) * (1 - t) * lab0[i] + 3 * (1 - t) * (1 - t) * t * lab1[i] + 3 * (1 - t) * t * t * lab2[i] + t * t * t * lab3[i]);
          return new Color(lab, "lab");
        };
      } else if (colors.length >= 5) {
        let labs, row, n;
        labs = colors.map((c) => c.lab());
        n = colors.length - 1;
        row = binom_row(n);
        I = function(t) {
          const u = 1 - t;
          const lab = [0, 1, 2].map((i) => labs.reduce((sum, el, j) => sum + row[j] * u ** (n - j) * t ** j * el[i], 0));
          return new Color(lab, "lab");
        };
      } else {
        throw new RangeError("No point in running bezier with only one color.");
      }
      return I;
    };
    module.exports = (colors) => {
      const f = bezier(colors);
      f.scale = () => scale(f);
      return f;
    };
  }
});

// node_modules/chroma-js/src/generator/blend.js
var require_blend = __commonJS({
  "node_modules/chroma-js/src/generator/blend.js"(exports, module) {
    require_rgb();
    var chroma7 = require_chroma();
    var blend = (bottom, top, mode) => {
      if (!blend[mode]) {
        throw new Error("unknown blend mode " + mode);
      }
      return blend[mode](bottom, top);
    };
    var blend_f = (f) => (bottom, top) => {
      const c0 = chroma7(top).rgb();
      const c1 = chroma7(bottom).rgb();
      return chroma7.rgb(f(c0, c1));
    };
    var each = (f) => (c0, c1) => {
      const out = [];
      out[0] = f(c0[0], c1[0]);
      out[1] = f(c0[1], c1[1]);
      out[2] = f(c0[2], c1[2]);
      return out;
    };
    var normal = (a) => a;
    var multiply = (a, b) => a * b / 255;
    var darken = (a, b) => a > b ? b : a;
    var lighten = (a, b) => a > b ? a : b;
    var screen = (a, b) => 255 * (1 - (1 - a / 255) * (1 - b / 255));
    var overlay = (a, b) => b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
    var burn = (a, b) => 255 * (1 - (1 - b / 255) / (a / 255));
    var dodge = (a, b) => {
      if (a === 255)
        return 255;
      a = 255 * (b / 255) / (1 - a / 255);
      return a > 255 ? 255 : a;
    };
    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));
    module.exports = blend;
  }
});

// node_modules/chroma-js/src/generator/cubehelix.js
var require_cubehelix = __commonJS({
  "node_modules/chroma-js/src/generator/cubehelix.js"(exports, module) {
    var { type, clip_rgb, TWOPI } = require_utils();
    var { pow, sin, cos } = Math;
    var chroma7 = require_chroma();
    module.exports = function(start = 300, rotations = -1.5, hue = 1, gamma = 1, lightness = [0, 1]) {
      let dh = 0, dl;
      if (type(lightness) === "array") {
        dl = lightness[1] - lightness[0];
      } else {
        dl = 0;
        lightness = [lightness, lightness];
      }
      const f = function(fract) {
        const a = TWOPI * ((start + 120) / 360 + rotations * fract);
        const l = pow(lightness[0] + dl * fract, gamma);
        const h = dh !== 0 ? hue[0] + fract * dh : hue;
        const amp = h * l * (1 - l) / 2;
        const cos_a = cos(a);
        const sin_a = sin(a);
        const r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
        const g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
        const b = l + amp * (1.97294 * cos_a);
        return chroma7(clip_rgb([r * 255, g * 255, b * 255, 1]));
      };
      f.start = function(s) {
        if (s == null) {
          return start;
        }
        start = s;
        return f;
      };
      f.rotations = function(r) {
        if (r == null) {
          return rotations;
        }
        rotations = r;
        return f;
      };
      f.gamma = function(g) {
        if (g == null) {
          return gamma;
        }
        gamma = g;
        return f;
      };
      f.hue = function(h) {
        if (h == null) {
          return hue;
        }
        hue = h;
        if (type(hue) === "array") {
          dh = hue[1] - hue[0];
          if (dh === 0) {
            hue = hue[1];
          }
        } else {
          dh = 0;
        }
        return f;
      };
      f.lightness = function(h) {
        if (h == null) {
          return lightness;
        }
        if (type(h) === "array") {
          lightness = h;
          dl = h[1] - h[0];
        } else {
          lightness = [h, h];
          dl = 0;
        }
        return f;
      };
      f.scale = () => chroma7.scale(f);
      f.hue(hue);
      return f;
    };
  }
});

// node_modules/chroma-js/src/generator/random.js
var require_random = __commonJS({
  "node_modules/chroma-js/src/generator/random.js"(exports, module) {
    var Color = require_Color();
    var digits = "0123456789abcdef";
    var { floor, random } = Math;
    module.exports = () => {
      let code = "#";
      for (let i = 0; i < 6; i++) {
        code += digits.charAt(floor(random() * 16));
      }
      return new Color(code, "hex");
    };
  }
});

// node_modules/chroma-js/src/utils/analyze.js
var require_analyze = __commonJS({
  "node_modules/chroma-js/src/utils/analyze.js"(exports, module) {
    var type = require_type();
    var { log, pow, floor, abs } = Math;
    var analyze = (data, key = null) => {
      const r = {
        min: Number.MAX_VALUE,
        max: Number.MAX_VALUE * -1,
        sum: 0,
        values: [],
        count: 0
      };
      if (type(data) === "object") {
        data = Object.values(data);
      }
      data.forEach((val) => {
        if (key && type(val) === "object")
          val = val[key];
        if (val !== void 0 && val !== null && !isNaN(val)) {
          r.values.push(val);
          r.sum += val;
          if (val < r.min)
            r.min = val;
          if (val > r.max)
            r.max = val;
          r.count += 1;
        }
      });
      r.domain = [r.min, r.max];
      r.limits = (mode, num) => limits(r, mode, num);
      return r;
    };
    var limits = (data, mode = "equal", num = 7) => {
      if (type(data) == "array") {
        data = analyze(data);
      }
      const { min, max } = data;
      const values = data.values.sort((a, b) => a - b);
      if (num === 1) {
        return [min, max];
      }
      const limits2 = [];
      if (mode.substr(0, 1) === "c") {
        limits2.push(min);
        limits2.push(max);
      }
      if (mode.substr(0, 1) === "e") {
        limits2.push(min);
        for (let i = 1; i < num; i++) {
          limits2.push(min + i / num * (max - min));
        }
        limits2.push(max);
      } else if (mode.substr(0, 1) === "l") {
        if (min <= 0) {
          throw new Error("Logarithmic scales are only possible for values > 0");
        }
        const min_log = Math.LOG10E * log(min);
        const max_log = Math.LOG10E * log(max);
        limits2.push(min);
        for (let i = 1; i < num; i++) {
          limits2.push(pow(10, min_log + i / num * (max_log - min_log)));
        }
        limits2.push(max);
      } else if (mode.substr(0, 1) === "q") {
        limits2.push(min);
        for (let i = 1; i < num; i++) {
          const p = (values.length - 1) * i / num;
          const pb = floor(p);
          if (pb === p) {
            limits2.push(values[pb]);
          } else {
            const pr = p - pb;
            limits2.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
          }
        }
        limits2.push(max);
      } else if (mode.substr(0, 1) === "k") {
        let cluster;
        const n = values.length;
        const assignments = new Array(n);
        const clusterSizes = new Array(num);
        let repeat = true;
        let nb_iters = 0;
        let centroids = null;
        centroids = [];
        centroids.push(min);
        for (let i = 1; i < num; i++) {
          centroids.push(min + i / num * (max - min));
        }
        centroids.push(max);
        while (repeat) {
          for (let j = 0; j < num; j++) {
            clusterSizes[j] = 0;
          }
          for (let i = 0; i < n; i++) {
            const value = values[i];
            let mindist = Number.MAX_VALUE;
            let best;
            for (let j = 0; j < num; j++) {
              const dist = abs(centroids[j] - value);
              if (dist < mindist) {
                mindist = dist;
                best = j;
              }
              clusterSizes[best]++;
              assignments[i] = best;
            }
          }
          const newCentroids = new Array(num);
          for (let j = 0; j < num; j++) {
            newCentroids[j] = null;
          }
          for (let i = 0; i < n; i++) {
            cluster = assignments[i];
            if (newCentroids[cluster] === null) {
              newCentroids[cluster] = values[i];
            } else {
              newCentroids[cluster] += values[i];
            }
          }
          for (let j = 0; j < num; j++) {
            newCentroids[j] *= 1 / clusterSizes[j];
          }
          repeat = false;
          for (let j = 0; j < num; j++) {
            if (newCentroids[j] !== centroids[j]) {
              repeat = true;
              break;
            }
          }
          centroids = newCentroids;
          nb_iters++;
          if (nb_iters > 200) {
            repeat = false;
          }
        }
        const kClusters = {};
        for (let j = 0; j < num; j++) {
          kClusters[j] = [];
        }
        for (let i = 0; i < n; i++) {
          cluster = assignments[i];
          kClusters[cluster].push(values[i]);
        }
        let tmpKMeansBreaks = [];
        for (let j = 0; j < num; j++) {
          tmpKMeansBreaks.push(kClusters[j][0]);
          tmpKMeansBreaks.push(kClusters[j][kClusters[j].length - 1]);
        }
        tmpKMeansBreaks = tmpKMeansBreaks.sort((a, b) => a - b);
        limits2.push(tmpKMeansBreaks[0]);
        for (let i = 1; i < tmpKMeansBreaks.length; i += 2) {
          const v = tmpKMeansBreaks[i];
          if (!isNaN(v) && limits2.indexOf(v) === -1) {
            limits2.push(v);
          }
        }
      }
      return limits2;
    };
    module.exports = { analyze, limits };
  }
});

// node_modules/chroma-js/src/utils/contrast.js
var require_contrast = __commonJS({
  "node_modules/chroma-js/src/utils/contrast.js"(exports, module) {
    var Color = require_Color();
    require_luminance();
    module.exports = (a, b) => {
      a = new Color(a);
      b = new Color(b);
      const l1 = a.luminance();
      const l2 = b.luminance();
      return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    };
  }
});

// node_modules/chroma-js/src/utils/delta-e.js
var require_delta_e = __commonJS({
  "node_modules/chroma-js/src/utils/delta-e.js"(exports, module) {
    var Color = require_Color();
    var { sqrt, pow, min, max, atan2, abs, cos, sin, exp: exp2, PI } = Math;
    module.exports = function(a, b, Kl = 1, Kc = 1, Kh = 1) {
      var rad2deg = function(rad) {
        return 360 * rad / (2 * PI);
      };
      var deg2rad = function(deg) {
        return 2 * PI * deg / 360;
      };
      a = new Color(a);
      b = new Color(b);
      const [L1, a1, b1] = Array.from(a.lab());
      const [L2, a2, b2] = Array.from(b.lab());
      const avgL = (L1 + L2) / 2;
      const C1 = sqrt(pow(a1, 2) + pow(b1, 2));
      const C2 = sqrt(pow(a2, 2) + pow(b2, 2));
      const avgC = (C1 + C2) / 2;
      const G = 0.5 * (1 - sqrt(pow(avgC, 7) / (pow(avgC, 7) + pow(25, 7))));
      const a1p = a1 * (1 + G);
      const a2p = a2 * (1 + G);
      const C1p = sqrt(pow(a1p, 2) + pow(b1, 2));
      const C2p = sqrt(pow(a2p, 2) + pow(b2, 2));
      const avgCp = (C1p + C2p) / 2;
      const arctan1 = rad2deg(atan2(b1, a1p));
      const arctan2 = rad2deg(atan2(b2, a2p));
      const h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
      const h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
      const avgHp = abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;
      const T = 1 - 0.17 * cos(deg2rad(avgHp - 30)) + 0.24 * cos(deg2rad(2 * avgHp)) + 0.32 * cos(deg2rad(3 * avgHp + 6)) - 0.2 * cos(deg2rad(4 * avgHp - 63));
      let deltaHp = h2p - h1p;
      deltaHp = abs(deltaHp) <= 180 ? deltaHp : h2p <= h1p ? deltaHp + 360 : deltaHp - 360;
      deltaHp = 2 * sqrt(C1p * C2p) * sin(deg2rad(deltaHp) / 2);
      const deltaL = L2 - L1;
      const deltaCp = C2p - C1p;
      const sl = 1 + 0.015 * pow(avgL - 50, 2) / sqrt(20 + pow(avgL - 50, 2));
      const sc = 1 + 0.045 * avgCp;
      const sh = 1 + 0.015 * avgCp * T;
      const deltaTheta = 30 * exp2(-pow((avgHp - 275) / 25, 2));
      const Rc = 2 * sqrt(pow(avgCp, 7) / (pow(avgCp, 7) + pow(25, 7)));
      const Rt = -Rc * sin(2 * deg2rad(deltaTheta));
      const result = sqrt(pow(deltaL / (Kl * sl), 2) + pow(deltaCp / (Kc * sc), 2) + pow(deltaHp / (Kh * sh), 2) + Rt * (deltaCp / (Kc * sc)) * (deltaHp / (Kh * sh)));
      return max(0, min(100, result));
    };
  }
});

// node_modules/chroma-js/src/utils/distance.js
var require_distance = __commonJS({
  "node_modules/chroma-js/src/utils/distance.js"(exports, module) {
    var Color = require_Color();
    module.exports = function(a, b, mode = "lab") {
      a = new Color(a);
      b = new Color(b);
      const l1 = a.get(mode);
      const l2 = b.get(mode);
      let sum_sq = 0;
      for (let i in l1) {
        const d = (l1[i] || 0) - (l2[i] || 0);
        sum_sq += d * d;
      }
      return Math.sqrt(sum_sq);
    };
  }
});

// node_modules/chroma-js/src/utils/valid.js
var require_valid = __commonJS({
  "node_modules/chroma-js/src/utils/valid.js"(exports, module) {
    var Color = require_Color();
    module.exports = (...args) => {
      try {
        new Color(...args);
        return true;
      } catch (e) {
        return false;
      }
    };
  }
});

// node_modules/chroma-js/src/utils/scales.js
var require_scales = __commonJS({
  "node_modules/chroma-js/src/utils/scales.js"(exports, module) {
    var chroma7 = require_chroma();
    require_hsl();
    var scale = require_scale();
    module.exports = {
      cool() {
        return scale([chroma7.hsl(180, 1, 0.9), chroma7.hsl(250, 0.7, 0.4)]);
      },
      hot() {
        return scale(["#000", "#f00", "#ff0", "#fff"], [0, 0.25, 0.75, 1]).mode("rgb");
      }
    };
  }
});

// node_modules/chroma-js/src/colors/colorbrewer.js
var require_colorbrewer = __commonJS({
  "node_modules/chroma-js/src/colors/colorbrewer.js"(exports, module) {
    var colorbrewer = {
      // sequential
      OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
      PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
      BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
      Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
      BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
      YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
      YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
      Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
      RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
      Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
      YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
      Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
      GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
      Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
      YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
      PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
      Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
      PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
      Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
      // diverging
      Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
      RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
      RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
      PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
      PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
      RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
      BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
      RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
      PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
      // qualitative
      Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
      Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
      Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
      Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
      Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
      Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
      Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
      Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
    };
    for (let key of Object.keys(colorbrewer)) {
      colorbrewer[key.toLowerCase()] = colorbrewer[key];
    }
    module.exports = colorbrewer;
  }
});

// node_modules/chroma-js/index.js
var require_chroma_js = __commonJS({
  "node_modules/chroma-js/index.js"(exports, module) {
    var chroma7 = require_chroma();
    require_cmyk();
    require_css();
    require_gl();
    require_hcg();
    require_hex();
    require_hsi();
    require_hsl();
    require_hsv();
    require_lab();
    require_lch();
    require_named();
    require_num();
    require_rgb();
    require_temp();
    require_oklab();
    require_oklch();
    require_alpha();
    require_clipped();
    require_darken();
    require_get();
    require_luminance();
    require_mix2();
    require_premultiply();
    require_saturate();
    require_set();
    require_rgb2();
    require_lrgb();
    require_lab2();
    require_lch2();
    require_num2();
    require_hcg2();
    require_hsi2();
    require_hsl2();
    require_hsv2();
    require_oklab2();
    require_oklch2();
    chroma7.average = require_average();
    chroma7.bezier = require_bezier();
    chroma7.blend = require_blend();
    chroma7.cubehelix = require_cubehelix();
    chroma7.mix = chroma7.interpolate = require_mix();
    chroma7.random = require_random();
    chroma7.scale = require_scale();
    chroma7.analyze = require_analyze().analyze;
    chroma7.contrast = require_contrast();
    chroma7.deltaE = require_delta_e();
    chroma7.distance = require_distance();
    chroma7.limits = require_analyze().limits;
    chroma7.valid = require_valid();
    chroma7.scales = require_scales();
    chroma7.colors = require_w3cx11();
    chroma7.brewer = require_colorbrewer();
    module.exports = chroma7;
  }
});

// src/utils/css/color.ts
function applyTextColor(node, color) {
  if (node.type === "TEXT") {
    const newFill = figma.util.solidPaint((0, import_chroma_js.default)(color).hex());
    node.fills = [newFill];
  } else if ("children" in node) {
    node.findAll((node2) => node2.type === "TEXT").forEach((textNode) => {
      const newFill = figma.util.solidPaint((0, import_chroma_js.default)(color).hex());
      textNode.fills = [newFill];
    });
  }
}
var import_chroma_js;
var init_color = __esm({
  "src/utils/css/color.ts"() {
    "use strict";
    import_chroma_js = __toESM(require_chroma_js());
  }
});

// src/utils/css/background.ts
function applyBackgroundColor(node, color) {
  if (node.type !== "TEXT" && fillableNodeTypes.includes(node.type)) {
    const newFill = figma.util.solidPaint((0, import_chroma_js2.default)(color).hex());
    node.fills = [newFill];
  }
}
var import_chroma_js2, fillableNodeTypes;
var init_background = __esm({
  "src/utils/css/background.ts"() {
    "use strict";
    import_chroma_js2 = __toESM(require_chroma_js());
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

// src/utils/extractStyles.ts
function extractCSSProperty(css, property) {
  const regex = new RegExp(`\\b${property}\\s*:\\s*(.*?)\\s*;`, "g");
  const match = regex.exec(css);
  return match ? match[1] : null;
}
function parse(css) {
  const functionMatch = css.match(/([\w-]+)\((.*)\)$/);
  if (!functionMatch) {
    console.error("Failed to parse CSS string:", css);
    return { type: "", value: "", nodes: [] };
  }
  const functionName = functionMatch[1];
  const args = functionMatch[2];
  const argList = args.split(/,\s*(?![^()]*\))/g);
  return {
    type: "function",
    value: functionName,
    nodes: argList.map((arg) => parseSingleArgument(arg.trim()))
  };
}
function parseSingleArgument(arg) {
  const nestedFunctionMatch = arg.match(/([a-z]+)\(([^)]+)\)/i);
  if (nestedFunctionMatch) {
    const funcName = nestedFunctionMatch[1];
    const funcArgs = nestedFunctionMatch[2];
    const colors = funcArgs.split(",").map((num) => parseFloat(num.trim()));
    return {
      type: "function",
      value: funcName,
      nodes: colors.map((color) => ({
        type: "number",
        value: color,
        unit: ""
      }))
    };
  }
  const numValue = parseFloat(arg);
  if (!isNaN(numValue)) {
    return { type: "number", value: numValue, unit: "" };
  }
  return { type: "word", value: arg };
}
var init_extractStyles = __esm({
  "src/utils/extractStyles.ts"() {
    "use strict";
  }
});

// src/utils/stringify.ts
function stringifyNode(node, custom) {
  let type = node.type;
  let value = node.value;
  let buf;
  let customResult;
  if (custom && (customResult = custom(node)) !== void 0) {
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
    return value + "(" + (node.before || "") + buf + (node.after || "") + (node.unclosed ? "" : ")");
  }
  return value;
}
function stringify(nodes, custom) {
  let result;
  let i;
  if (Array.isArray(nodes)) {
    result = "";
    for (i = nodes.length - 1; ~i; i -= 1) {
      result = stringifyNode(nodes[i], custom) + result;
    }
    return result;
  }
  return stringifyNode(nodes, custom);
}
var init_stringify = __esm({
  "src/utils/stringify.ts"() {
    "use strict";
  }
});

// src/utils/units.ts
function likeNumber(value) {
  var code = value.charCodeAt(0);
  var nextCode;
  if (code === plus || code === minus) {
    nextCode = value.charCodeAt(1);
    if (nextCode >= 48 && nextCode <= 57) {
      return true;
    }
    var nextNextCode = value.charCodeAt(2);
    if (nextCode === dot && nextNextCode >= 48 && nextNextCode <= 57) {
      return true;
    }
    return false;
  }
  if (code === dot) {
    nextCode = value.charCodeAt(1);
    if (nextCode >= 48 && nextCode <= 57) {
      return true;
    }
    return false;
  }
  if (code >= 48 && code <= 57) {
    return true;
  }
  return false;
}
function unit(value) {
  var pos = 0;
  var length = value.length;
  var code;
  var nextCode;
  var nextNextCode;
  if (length === 0 || !likeNumber(value)) {
    return false;
  }
  code = value.charCodeAt(pos);
  if (code === plus || code === minus) {
    pos++;
  }
  while (pos < length) {
    code = value.charCodeAt(pos);
    if (code < 48 || code > 57) {
      break;
    }
    pos += 1;
  }
  code = value.charCodeAt(pos);
  nextCode = value.charCodeAt(pos + 1);
  if (code === dot && nextCode >= 48 && nextCode <= 57) {
    pos += 2;
    while (pos < length) {
      code = value.charCodeAt(pos);
      if (code < 48 || code > 57) {
        break;
      }
      pos += 1;
    }
  }
  code = value.charCodeAt(pos);
  nextCode = value.charCodeAt(pos + 1);
  nextNextCode = value.charCodeAt(pos + 2);
  if ((code === exp || code === EXP) && (nextCode >= 48 && nextCode <= 57 || (nextCode === plus || nextCode === minus) && nextNextCode >= 48 && nextNextCode <= 57)) {
    pos += nextCode === plus || nextCode === minus ? 3 : 2;
    while (pos < length) {
      code = value.charCodeAt(pos);
      if (code < 48 || code > 57) {
        break;
      }
      pos += 1;
    }
  }
  return {
    number: value.slice(0, pos),
    unit: value.slice(pos)
  };
}
var minus, plus, dot, exp, EXP;
var init_units = __esm({
  "src/utils/units.ts"() {
    "use strict";
    minus = "-".charCodeAt(0);
    plus = "+".charCodeAt(0);
    dot = ".".charCodeAt(0);
    exp = "e".charCodeAt(0);
    EXP = "E".charCodeAt(0);
  }
});

// src/utils/parsers/gradientParser.ts
function parseGradient(css) {
  const parsed = parse(css);
  console.log("Parsed Output:", JSON.stringify(parsed));
  if (!parsed.nodes.length || !["linear-gradient", "radial-gradient", "conic-gradient"].includes(
    parsed.value
  )) {
    console.error("Incorrect or unsupported gradient format:", parsed.value);
    return [];
  }
  const gradientType = parsed.value.replace(/^-webkit-/, "").trim();
  let gradientNodes = parsed.nodes;
  switch (gradientType) {
    case "linear-gradient":
      return parseLinearGradient(gradientType, gradientNodes);
    case "radial-gradient":
      return parseRadialGradient(gradientType, gradientNodes);
    case "conic-gradient":
      return parseConicGradient(gradientType, gradientNodes);
    default:
      console.warn(
        `Unsupported or unrecognized gradient type: '${gradientType}'`
      );
      return [];
  }
}
function parseLinearGradient(type, nodes) {
  console.log("Received nodes for linear gradient:", nodes);
  let angle = 0;
  let colorStops = [];
  nodes.forEach((node) => {
    if (node.type === "number") {
      console.log("Angle node found:", node);
      angle = node.value;
    } else if (node.type === "function" && node.value === "rgb") {
      console.log("Color node found:", node);
      const color = `rgba(${node.nodes.map((n) => n.value).join(", ")}, 1)`;
      colorStops.push({ color, position: void 0 });
    } else {
      console.error("Unsupported node type in gradient:", node);
    }
  });
  return [
    {
      type,
      angle,
      colorStops
    }
  ];
}
function parseRadialGradient(type, nodes) {
  console.log("Received nodes for Radial gradient:", nodes);
  let endingShape = "ellipse";
  let size = "farthest-corner";
  let colorStops = [];
  let position = "center";
  let hasOptionalArgs = false;
  const firstArgSet = nodes.shift() || [];
  for (let i = 0; i < firstArgSet.length; i++) {
    const arg = firstArgSet[i];
    switch (arg.value) {
      case "circle":
      case "ellipse":
        hasOptionalArgs = true;
        endingShape = arg.value;
        break;
      case "closest-corner":
      case "closest-side":
      case "farthest-corner":
      case "farthest-side":
        hasOptionalArgs = true;
        size = arg.value;
        break;
      case "at":
        hasOptionalArgs = true;
        position = parsePosition(firstArgSet.slice(i + 1));
        break;
      default:
        if (!hasOptionalArgs) {
          let length = toUnit(arg, "px");
          if (length) {
            if (!Array.isArray(size)) {
              size = [];
            }
            size.push(length);
          } else {
            console.error(`Unexpected radial-gradient argument: ${arg.value}`);
            break;
          }
        }
    }
  }
  nodes.forEach((node) => {
    if (node.type === "function" && node.value === "rgb") {
      console.log("Color node found:", node);
      const color = `rgba(${node.nodes.map((n) => n.value).join(", ")}, 1)`;
      colorStops.push({ color, position: void 0 });
    } else {
      console.error("Unsupported node type in gradient:", node);
    }
  });
  console.error("Radial gradient color stops:", colorStops);
  return [
    {
      type,
      endingShape,
      // default
      size,
      // default
      position,
      // default
      colorStops
    }
  ];
}
function parsePosition(args) {
  return args.map((arg) => arg.value).join(" ");
}
function parseConicGradient(type, args) {
  const ret = {
    type,
    position: "center"
  };
  let hasOptionalArg = false;
  const optionsArg = args[0];
  if (optionsArg[0].value === "from") {
    const value = toUnit(optionsArg[1], "deg");
    if (!value)
      throw new Error(`Angle expected: ` + stringify(optionsArg[1]));
    ret.angle = toDegrees(value);
    optionsArg.splice(0, 2);
    hasOptionalArg = true;
  }
  if (optionsArg[0].value === "at") {
    ret.position = stringifySpacedArgs(optionsArg.slice(1));
    hasOptionalArg = true;
  }
  if (hasOptionalArg)
    args.shift();
  ret.colorStops = args.map(toAngularColorStopOrHint);
  return ret;
}
function toUnit(node, unitForZero) {
  if ((node == null ? void 0 : node.type) !== "word")
    return false;
  const ret = unit(node.value);
  if (!ret)
    return false;
  if (ret.unit) {
    ret.unit = ret.unit.toLowerCase();
  } else if (ret.number === "0") {
    ret.unit = unitForZero;
  } else {
    return false;
  }
  return {
    unit: ret.unit,
    value: parseFloat(ret.number)
  };
}
function toDegrees({ value, unit: unit2 }) {
  switch (unit2.toLowerCase()) {
    case "deg":
      return value;
    case "rad":
      return 180 * value / Math.PI;
    case "grad":
      return 360 * value / 400;
    case "turn":
      return 360 * value;
  }
  throw new Error("Unsupported dimension: " + unit2);
}
function toRgba(node) {
  return (0, import_chroma_js3.default)(stringify(node)).gl();
}
function toAngularColorStopOrHint(nodes) {
  if (nodes.length === 1) {
    const hint = toUnit(nodes[0], "deg");
    if (hint && ANGLE_OR_PERCENTAGE_UNITS.includes(hint.unit)) {
      return {
        type: "color-hint",
        hint
      };
    }
    return {
      type: "angular-color-stop",
      rgba: toRgba(nodes[0])
    };
  }
  if (nodes.length === 2) {
    const angle = toUnit(nodes[1], "deg");
    if (angle && ANGLE_OR_PERCENTAGE_UNITS.includes(angle.unit)) {
      return {
        type: "angular-color-stop",
        rgba: toRgba(nodes[0]),
        angle
      };
    }
  }
  if (nodes.length === 3) {
    const angles = nodes.slice(1, 3).map((it) => toUnit(it, "deg"));
    if (angles.every((v) => v && ANGLE_OR_PERCENTAGE_UNITS.includes(v.unit))) {
      return {
        type: "angular-color-stop",
        rgba: toRgba(nodes[0]),
        angle: angles
      };
    }
  }
  throw new Error("Invalid angular color stop: " + stringifySpacedArgs(nodes));
}
function stringifySpacedArgs(args) {
  return args.map((arg) => arg.value).join(" ");
}
var import_chroma_js3, ANGLE_UNITS, ANGLE_OR_PERCENTAGE_UNITS;
var init_gradientParser = __esm({
  "src/utils/parsers/gradientParser.ts"() {
    "use strict";
    import_chroma_js3 = __toESM(require_chroma_js());
    init_extractStyles();
    init_stringify();
    init_units();
    ANGLE_UNITS = ["deg", "turn", "rad", "grad"];
    ANGLE_OR_PERCENTAGE_UNITS = [...ANGLE_UNITS, "%"];
  }
});

// src/utils/css/backgroundImage.ts
function applyBackgroundImage(node, gradientCss) {
  const gradients = cssToFigmaGradients(gradientCss);
  node.fills = gradients.map((gradient) => ({
    type: gradient.type,
    gradientTransform: gradient.gradientTransform,
    gradientStops: gradient.gradientStops.map((stop) => ({
      color: stop.color,
      position: stop.position
      // Ensure this exists, or provide a default
    }))
  }));
  console.log("Node Fills Set:", node.fills);
}
function cssToFigmaGradients(css) {
  console.log("Converting CSS to Figma gradients", css);
  const parsedGradients = parseGradient(css);
  if (!parsedGradients.length) {
    console.warn("No gradients parsed from CSS.");
    return [];
  }
  return parsedGradients.map((parsedGradient) => {
    console.log("Processing Gradient:", parsedGradient);
    return convertParsedGradientToFigmaGradient(
      parsedGradient,
      parsedGradients.length
    );
  });
}
function convertParsedGradientToFigmaGradient(parsedGradient, gradientLength) {
  if (typeof parsedGradient !== "object" || !parsedGradient.type) {
    console.error("Invalid gradient data encountered", parsedGradient);
    throw new Error("Invalid gradient data provided.");
  }
  const stopAmounts = parsedGradient.colorStops.length;
  const figmaGradient = {
    type: getFigmaGradientType(parsedGradient.type),
    gradientTransform: composeTransform(parsedGradient.angle || 0),
    gradientStops: parsedGradient.colorStops.map(
      (stop, index) => ({
        color: convertColorToRGBA(stop.color),
        position: getPosition(stop.color, index, stopAmounts, gradientLength)
        // Ensure this exists, or provide a default
      })
    )
  };
  return figmaGradient;
}
function getFigmaGradientType(cssType) {
  switch (cssType) {
    case "linear-gradient":
      return "GRADIENT_LINEAR";
    case "radial-gradient":
      return "GRADIENT_RADIAL";
    default:
      return "GRADIENT_UNKNOWN";
  }
}
function composeTransform(angle) {
  const radians = angle * Math.PI / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return {
    0: { 0: cos, 1: -sin, 2: 0 },
    1: { 0: sin, 1: cos, 2: 0 }
  };
}
function convertColorToRGBA(color) {
  const colorParts = color.match(/\d+/g);
  let r = parseInt(colorParts[0]) / 255;
  let g = parseInt(colorParts[1]) / 255;
  let b = parseInt(colorParts[2]) / 255;
  let a = colorParts.length > 3 ? parseFloat(colorParts[3]) : 1;
  return { r, g, b, a };
}
function getPosition(stop, index, total, gradientLength, previousPosition = 0) {
  if (total <= 1)
    return 0;
  const normalize = (v) => Math.max(previousPosition, Math.min(1, v));
  if (stop.position) {
    if (stop.position.value <= 0) {
      return normalize(0);
    }
    switch (stop.position.unit) {
      case "%":
        return normalize(stop.position.value / 100);
      case "px":
        return normalize(stop.position.value / gradientLength);
      default:
        console.warn("Unsupported stop position unit: ", stop.position.unit);
    }
  }
  console.error("Color stop:", stop);
  console.error("Color index:", index);
  console.error("Color stop total:", total);
  console.error("Gradient length:", gradientLength);
  return normalize(index / (total - 1));
}
var init_backgroundImage = __esm({
  "src/utils/css/backgroundImage.ts"() {
    "use strict";
    init_gradientParser();
  }
});

// src/utils/applyStyles.ts
function applyStylerToSelection(css, property, styler, propertyParser) {
  let propValue = extractCSSProperty(css, property);
  if (propValue !== "" && propValue !== null) {
    const parsedPropValues = propertyParser ? propertyParser(propValue) : propValue;
    const selectedNodes = figma.currentPage.selection;
    selectedNodes.forEach((node) => styler(node, parsedPropValues));
  }
}
function applyProperty(node, property, value) {
  if (node && property in node) {
    node[property] = value;
  }
}
var init_applyStyles = __esm({
  "src/utils/applyStyles.ts"() {
    "use strict";
    init_extractStyles();
  }
});

// src/utils/css/border.ts
function applyBorderShorthand(node, width, style, color) {
  var _a, _b;
  const numericWidth = parseFloat(width);
  applyProperty(node, "strokes", [figma.util.solidPaint((0, import_chroma_js4.default)(color).hex())]);
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
  applyProperty(node, "strokes", [figma.util.solidPaint((0, import_chroma_js4.default)(color).hex())]);
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
function applyLeftStrokeWidth(node, width) {
  applyProperty(node, "strokeLeftWeight", parseFloat(width));
}
function applyRightStrokeWidth(node, width) {
  applyProperty(node, "strokeRightWeight", parseFloat(width));
}
function applyBottomStrokeWidth(node, width) {
  applyProperty(node, "strokeBottomWeight", parseFloat(width));
}
function applyTopStrokeWidth(node, width) {
  applyProperty(node, "strokeTopWeight", parseFloat(width));
}
function applyLeftStrokeColor(node, color) {
  applyProperty(node, "strokes", [figma.util.solidPaint((0, import_chroma_js4.default)(color).hex())]);
}
function applyRightStrokeColor(node, color) {
  applyProperty(node, "strokes", [figma.util.solidPaint((0, import_chroma_js4.default)(color).hex())]);
}
function applyTopStrokeColor(node, color) {
  applyProperty(node, "strokes", [figma.util.solidPaint((0, import_chroma_js4.default)(color).hex())]);
}
function applyBottomStrokeColor(node, color) {
  applyProperty(node, "strokes", [figma.util.solidPaint((0, import_chroma_js4.default)(color).hex())]);
}
var import_chroma_js4;
var init_border = __esm({
  "src/utils/css/border.ts"() {
    "use strict";
    import_chroma_js4 = __toESM(require_chroma_js());
    init_applyStyles();
  }
});

// src/utils/css/shadow.ts
function parseValue(shadow) {
  const colorRegEx = /((rgb|rgba|hsl|hsla)\(.*?\))|((#)?([0-9a-f]{3}){1,2}\b)/i;
  const shadows = shadow.split(/,(?![^\(]*\))/);
  return shadows.map((item) => {
    const boxShadow = {
      inset: false,
      offsetX: 0,
      offsetY: 0,
      blurRadius: 0,
      spreadRadius: 0,
      color: ""
    };
    const colorMatch = item.match(colorRegEx);
    if (colorMatch) {
      boxShadow.color = colorMatch[0];
      item = item.replace(colorMatch[0], "").trim();
    }
    const properties = item.split(" ").filter((prop) => prop.trim() !== "");
    if (properties[0].toLowerCase() == "inset") {
      boxShadow.inset = true;
      properties.shift();
    }
    if (properties.length)
      boxShadow.offsetX = parseFloat(properties[0]);
    if (properties.length > 1)
      boxShadow.offsetY = parseFloat(properties[1]);
    if (properties.length > 2)
      boxShadow.blurRadius = parseFloat(properties[2]);
    if (properties.length > 3)
      boxShadow.spreadRadius = parseFloat(properties[3]);
    return boxShadow;
  });
}
function parseInnerShadow(boxShadow) {
  const shadowValues = parseValue(boxShadow);
  const effects = [];
  shadowValues.filter((boxValue) => boxValue.inset).forEach((boxValue) => {
    const convertedColor = import_chroma_js5.default.valid(boxValue.color) ? (0, import_chroma_js5.default)(boxValue.color).gl() : [0, 0, 0, 1];
    const effect = {
      type: "INNER_SHADOW",
      color: {
        r: convertedColor[0],
        g: convertedColor[1],
        b: convertedColor[2],
        a: convertedColor[3]
      },
      blendMode: "NORMAL",
      offset: {
        x: boxValue.offsetX,
        y: boxValue.offsetY
      },
      radius: boxValue.blurRadius,
      spread: boxValue.spreadRadius,
      visible: true
    };
    effects.push(effect);
  });
  return effects.reverse();
}
function parseDropShadow(boxShadow) {
  const shadowValues = parseValue(boxShadow);
  const effects = [];
  shadowValues.filter((boxValue) => !boxValue.inset).forEach((boxValue) => {
    const convertedColor = import_chroma_js5.default.valid(boxValue.color) ? (0, import_chroma_js5.default)(boxValue.color).gl() : [0, 0, 0, 1];
    const effect = {
      type: "DROP_SHADOW",
      color: {
        r: convertedColor[0],
        g: convertedColor[1],
        b: convertedColor[2],
        a: convertedColor[3]
      },
      blendMode: "NORMAL",
      offset: {
        x: boxValue.offsetX,
        y: boxValue.offsetY
      },
      radius: boxValue.blurRadius,
      spread: boxValue.spreadRadius,
      visible: true
    };
    effects.push(effect);
  });
  return effects.reverse();
}
function applyInnerShadow(node, effects) {
  if ("effects" in node) {
    const existingEffects = node.effects.filter(
      (effect) => effect.type !== "INNER_SHADOW"
    );
    node.effects = [...existingEffects, ...effects];
  }
}
function applyDropShadow(node, effects) {
  if ("effects" in node) {
    const existingEffects = node.effects.filter(
      (effect) => effect.type !== "DROP_SHADOW"
    );
    node.effects = [...existingEffects, ...effects];
  }
}
var import_chroma_js5;
var init_shadow = __esm({
  "src/utils/css/shadow.ts"() {
    "use strict";
    import_chroma_js5 = __toESM(require_chroma_js());
  }
});

// src/utils/css/borderRadius.ts
function parseBorderRadius(radius) {
  const properties = radius.split(" ").filter((prop) => prop.trim() !== "");
  const borderRadius = {
    topLeftRadius: 0,
    topRightRadius: 0,
    bottomRightRadius: 0,
    bottomLeftRadius: 0
  };
  switch (properties.length) {
    case 1:
      borderRadius.topLeftRadius = borderRadius.topRightRadius = borderRadius.bottomRightRadius = borderRadius.bottomLeftRadius = parseFloat(properties[0]);
      break;
    case 2:
      borderRadius.topLeftRadius = borderRadius.bottomRightRadius = parseFloat(
        properties[0]
      );
      borderRadius.topRightRadius = borderRadius.bottomLeftRadius = parseFloat(
        properties[1]
      );
      break;
    case 3:
      borderRadius.topLeftRadius = parseFloat(properties[0]);
      borderRadius.topRightRadius = borderRadius.bottomLeftRadius = parseFloat(
        properties[1]
      );
      borderRadius.bottomRightRadius = parseFloat(properties[2]);
      break;
    case 4:
      borderRadius.topLeftRadius = parseFloat(properties[0]);
      borderRadius.topRightRadius = parseFloat(properties[1]);
      borderRadius.bottomRightRadius = parseFloat(properties[2]);
      borderRadius.bottomLeftRadius = parseFloat(properties[3]);
      break;
    default:
      console.error("Invalid border radius value");
      break;
  }
  return borderRadius;
}
function applyBorderRadius(node, radius) {
  const borderRadius = parseBorderRadius(radius);
  applyProperty(node, "topLeftRadius", borderRadius.topLeftRadius);
  applyProperty(node, "topRightRadius", borderRadius.topRightRadius);
  applyProperty(node, "bottomLeftRadius", borderRadius.bottomLeftRadius);
  applyProperty(node, "bottomRightRadius", borderRadius.bottomRightRadius);
}
var init_borderRadius = __esm({
  "src/utils/css/borderRadius.ts"() {
    "use strict";
    init_applyStyles();
  }
});

// src/utils/css/typography/textDecoration.ts
async function applyTextDecoration(node, decoration) {
  if (node.type === "TEXT") {
    try {
      await figma.loadFontAsync(node.fontName);
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
    node.findAll((childNode) => childNode.type === "TEXT").forEach(async (textNode) => {
      try {
        await figma.loadFontAsync(textNode.fontName);
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
function parseTextDecoration(decoration) {
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
var init_textDecoration = __esm({
  "src/utils/css/typography/textDecoration.ts"() {
    "use strict";
  }
});

// src/utils/css/typography/textTransform.ts
async function applyTextTransform(node, textTransform) {
  if (node.type === "TEXT") {
    try {
      await figma.loadFontAsync(node.fontName);
      let figmaTextCase;
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
var init_textTransform = __esm({
  "src/utils/css/typography/textTransform.ts"() {
    "use strict";
  }
});

// src/utils/css/rotate.ts
function applyRotate(node, rotation) {
  const degree = parseFloat(rotation.replace("deg", ""));
  node.rotation = degree;
}
var init_rotate = __esm({
  "src/utils/css/rotate.ts"() {
    "use strict";
  }
});

// src/utils/css/width.ts
function applyWidth(node, width) {
  const widthToApply = parseFloat(width);
  node.resize(widthToApply, node.height);
}
var init_width = __esm({
  "src/utils/css/width.ts"() {
    "use strict";
  }
});

// src/utils/css/height.ts
function applyHeight(node, height) {
  const heightToApply = parseFloat(height);
  node.resize(node.width, heightToApply);
}
var init_height = __esm({
  "src/utils/css/height.ts"() {
    "use strict";
  }
});

// src/utils/css/overflow.ts
function applyOverflow(node, overflow) {
  if (overflow === "hidden") {
    node.clipsContent = true;
  } else {
    node.clipsContent = false;
  }
}
var init_overflow = __esm({
  "src/utils/css/overflow.ts"() {
    "use strict";
  }
});

// src/utils/css/opacity.ts
function applyOpacity(node, opacity) {
  const opacityToApply = parseFloat(opacity);
  if (opacityToApply >= 0 && opacityToApply <= 1) {
    node.opacity = opacityToApply;
  } else {
    throw new Error("Opacity must be a value between 0 and 1");
  }
}
var init_opacity = __esm({
  "src/utils/css/opacity.ts"() {
    "use strict";
  }
});

// src/utils/css/blur.ts
function applyFilterBlur(node, blur) {
  const matches = blur.match(/blur\((.*?)px\)/);
  let blurValue;
  if (matches) {
    blurValue = parseFloat(matches[1]);
  } else {
    throw new Error("Invalid blur value");
  }
  if (isNaN(blurValue)) {
    throw new Error("Blur value is not a number");
  }
  if (blurValue > 100) {
    blurValue = 100;
  } else if (blurValue < 0) {
    throw new Error("Blur value must be 0 or greater");
  }
  let newEffects = node.effects.filter(
    (effect) => effect.type !== "BACKGROUND_BLUR"
  );
  newEffects.push({
    type: "LAYER_BLUR",
    radius: blurValue,
    visible: true
  });
  node.effects = newEffects;
}
var init_blur = __esm({
  "src/utils/css/blur.ts"() {
    "use strict";
  }
});

// src/utils/css/backgroundBlur.ts
function applyBgFilterBlur(node, blur) {
  const matches = blur.match(/blur\((.*?)px\)/);
  let blurValue;
  if (matches) {
    blurValue = parseFloat(matches[1]);
  } else {
    throw new Error("Invalid blur value");
  }
  if (isNaN(blurValue)) {
    throw new Error("Blur value is not a number");
  }
  if (blurValue > 100) {
    blurValue = 100;
  } else if (blurValue < 0) {
    throw new Error("Blur value must be 0 or greater");
  }
  let newEffects = node.effects.filter(
    (effect) => effect.type !== "LAYER_BLUR"
  );
  newEffects.push({
    type: "BACKGROUND_BLUR",
    radius: blurValue,
    visible: true
  });
  node.effects = newEffects;
}
var init_backgroundBlur = __esm({
  "src/utils/css/backgroundBlur.ts"() {
    "use strict";
  }
});

// src/utils/css/blendMode.ts
function applyMixBlendMode(node, blendMode) {
  const allowedBlendModes = [
    "PASS_THROUGH",
    "NORMAL",
    "DARKEN",
    "MULTIPLY",
    "LINEAR_BURN",
    "COLOR_BURN",
    "LIGHTEN",
    "SCREEN",
    "LINEAR_DODGE",
    "COLOR_DODGE",
    "OVERLAY",
    "SOFT_LIGHT",
    "HARD_LIGHT",
    "DIFFERENCE",
    "EXCLUSION",
    "HUE",
    "SATURATION",
    "COLOR",
    "LUMINOSITY"
  ];
  if (!blendMode) {
    console.error("No blend mode provided");
    return;
  }
  let upperCaseBlendMode = blendMode.toUpperCase();
  if (allowedBlendModes.includes(upperCaseBlendMode)) {
    node.blendMode = upperCaseBlendMode;
  } else {
    console.error(`Invalid blend mode: ${blendMode}`);
  }
}
var init_blendMode = __esm({
  "src/utils/css/blendMode.ts"() {
    "use strict";
  }
});

// src/utils/css/flex.ts
function applyFlex(node, display) {
  if (display === "flex") {
    node.layoutMode = "HORIZONTAL";
  } else {
    node.layoutMode = "NONE";
  }
}
function applyFlexDirection(node, direction) {
  if (direction === "row") {
    node.layoutMode = "HORIZONTAL";
  } else if (direction === "column") {
    node.layoutMode = "VERTICAL";
  }
}
function applyJustifyContent(node, justifyContent) {
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
function applyAlignItems(node, alignItems) {
  if (alignItems === "flex-start") {
    node.counterAxisAlignItems = "MIN";
  } else if (alignItems === "flex-end") {
    node.counterAxisAlignItems = "MAX";
  } else if (alignItems === "center") {
    node.counterAxisAlignItems = "CENTER";
  }
}
function applyFlexWrap(node, flexWrap) {
  if (flexWrap === "nowrap") {
    node.layoutWrap = "NO_WRAP";
  } else if (flexWrap === "wrap") {
    node.layoutWrap = "WRAP";
  }
}
function applyGap(node, gap) {
  node.itemSpacing = parseFloat(gap);
}
function applyFlexGrow(node, grow) {
  node.itemSpalayoutGrowcing = parseFloat(grow);
}
var init_flex = __esm({
  "src/utils/css/flex.ts"() {
    "use strict";
  }
});

// src/utils/css/padding.ts
function parsePadding(padding) {
  return padding.split(" ").map(parseFloat);
}
function applyPadding(node, paddingValues) {
  let padding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  if (paddingValues.length === 1) {
    padding.top = padding.right = padding.bottom = padding.left = paddingValues[0];
  } else if (paddingValues.length === 2) {
    padding.top = padding.bottom = paddingValues[0];
    padding.right = padding.left = paddingValues[1];
  } else if (paddingValues.length === 3) {
    padding.top = paddingValues[0];
    padding.right = padding.left = paddingValues[1];
    padding.bottom = paddingValues[2];
  } else if (paddingValues.length === 4) {
    padding.top = paddingValues[0];
    padding.right = paddingValues[1];
    padding.bottom = paddingValues[2];
    padding.left = paddingValues[3];
  }
  if (node.layoutMode !== "NONE") {
    node.paddingTop = padding.top;
    node.paddingRight = padding.right;
    node.paddingBottom = padding.bottom;
    node.paddingLeft = padding.left;
  }
}
var init_padding = __esm({
  "src/utils/css/padding.ts"() {
    "use strict";
  }
});

// src/utils/css/textShadow.ts
function parseValue2(shadow) {
  const shadows = shadow.split(/,(?![^\(]*\))/).map((shadow2) => shadow2.trim());
  return shadows.map((shadow2) => {
    const parts = shadow2.split(" ");
    const values = parts.filter((part) => !isNaN(parseFloat(part)));
    const colors = parts.filter((part) => isNaN(parseFloat(part)));
    return {
      offsetX: parseFloat(values[0]),
      offsetY: parseFloat(values[1]),
      blurRadius: parseFloat(values[2] || 0),
      color: colors[0] || "black"
      // Defaults to black
    };
  });
}
function parseTextShadow(textShadow) {
  const shadowValues = parseValue2(textShadow);
  const effects = [];
  shadowValues.forEach((shadowValue) => {
    const convertedColor = import_chroma_js6.default.valid(shadowValue.color) ? (0, import_chroma_js6.default)(shadowValue.color).gl() : [0, 0, 0, 1];
    const effect = {
      type: "DROP_SHADOW",
      color: {
        r: convertedColor[0],
        g: convertedColor[1],
        b: convertedColor[2],
        a: convertedColor[3]
      },
      blendMode: "NORMAL",
      offset: {
        x: shadowValue.offsetX,
        y: shadowValue.offsetY
      },
      radius: shadowValue.blurRadius,
      spread: 0,
      visible: true
    };
    effects.push(effect);
  });
  return effects.reverse();
}
function applyTextShadow(node, effects) {
  if (node.type === "TEXT") {
    const existingEffects = node.effects.filter(
      (effect) => effect.type !== "DROP_SHADOW"
    );
    node.effects = [...existingEffects, ...effects];
  }
}
var import_chroma_js6;
var init_textShadow = __esm({
  "src/utils/css/textShadow.ts"() {
    "use strict";
    import_chroma_js6 = __toESM(require_chroma_js());
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
    Object.entries(stylerFunctions).forEach(([property, value]) => {
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
var stylerFunctions;
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
    init_lib();
    init_color();
    init_background();
    init_backgroundImage();
    init_border();
    init_applyStyles();
    init_shadow();
    init_borderRadius();
    init_textDecoration();
    init_textTransform();
    init_rotate();
    init_width();
    init_height();
    init_overflow();
    init_opacity();
    init_blur();
    init_backgroundBlur();
    init_blendMode();
    init_flex();
    init_padding();
    init_textShadow();
    stylerFunctions = {
      color: { applyFn: applyTextColor },
      "background-color": { applyFn: applyBackgroundColor },
      border: { applyFn: applyBorderShorthand, parser: parseBorderProperty },
      "background-image": {
        applyFn: applyBackgroundImage
      },
      "border-top-width": { applyFn: applyTopStrokeWidth },
      "border-right-width": { applyFn: applyRightStrokeWidth },
      "border-bottom-width": { applyFn: applyBottomStrokeWidth },
      "border-left-width": { applyFn: applyLeftStrokeWidth },
      "border-top-color": { applyFn: applyTopStrokeColor },
      "border-right-color": { applyFn: applyRightStrokeColor },
      "border-bottom-color": { applyFn: applyBottomStrokeColor },
      "border-left-color": { applyFn: applyLeftStrokeColor },
      "border-color": { applyFn: applyStrokeColor },
      "border-width": { applyFn: applyStrokeWidth },
      "border-style": { applyFn: applyStrokeStyle },
      "border-radius": { applyFn: applyBorderRadius },
      "border-top-left-radius": { applyFn: applyBorderRadius },
      "border-top-right-radius": { applyFn: applyBorderRadius },
      "border-bottom-left-radius": { applyFn: applyBorderRadius },
      "border-bottom-right-radius": { applyFn: applyBorderRadius },
      "box-shadow": [
        { applyFn: applyDropShadow, parser: parseDropShadow },
        { applyFn: applyInnerShadow, parser: parseInnerShadow }
      ],
      "text-shadow": [{ applyFn: applyTextShadow, parser: parseTextShadow }],
      "background-blend-mode": {
        applyFn: applyMixBlendMode
      },
      "mix-blend-mode": {
        applyFn: applyMixBlendMode
      },
      "text-decoration": {
        applyFn: applyTextDecoration,
        parser: parseTextDecoration
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
      height: { applyFn: applyHeight }
    };
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();

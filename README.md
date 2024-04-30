<img width="1024" alt="CSS Paint Figma Plugin" src="https://github.com/buildkite/figma-css-paste/assets/7619810/abd3bb2d-24d3-4a80-b366-9ae97a8be30f">

<h1 align="center">CSSPaint</h1>
<p align="center">A Figma plugin to easily apply CSS styles to your objects, layers and frames</p>

---

## Support Guide

| CSS Property                  | Figma Property                           | Supported Values                                     | Status         |
| :---                          | :---                                     | :---                                                 | :---           |  
| `color`                       | `textNode.fill`                          | All color types                                      | 🟢 Stable      |
| `background-color`            | `node.fills`                             | All color types                                      | 🟢 Stable      |
| `background-image`            | `node.fills`                             | Linear and radial gradients only                     | 🟡 Beta        |
| `border`                      | `strokes`, `strokeWeight`, `dashPattern` | All color types - Pixel values - Solid, dashed and dotted            | 🟠 Alpha       |
| `border-top-width`            | `strokeWeight`                           | Pixel values                                         | 🟠 Alpha       |
| `border-right-width`          | `strokeWeight`                           | Pixel values                                         | 🟠 Alpha       |
| `border-bottom-width`         | `strokeWeight`                           | Pixel values                                         | 🟠 Alpha       |
| `border-left-width`           | `strokeWeight`                           | Pixel values                                         | 🟠 Alpha       |
| `border-top-color`            | `strokes`                                | All color types                                      | 🟢 Stable      |
| `border-right-color`          | `strokes`                                | All color types                                      | 🟢 Stable      |
| `border-bottom-color`         | `strokes`                                | All color types                                      | 🟢 Stable      |
| `border-left-color`           | `strokes`                                | All color types                                      | 🟢 Stable      |
| `border-color`                | `strokes`                                | All color types                                      | 🟢 Stable      |
| `border-width`                | `strokeWeight`                           | Pixel values                                         | 🟢 Stable      |
| `border-style`                | `dashPattern`                            | Solid, dashed and dotted                             | 🟢 Stable      |
| `border-radius`               | `topLeftRadius`, `topRightRadius`, `bottomRightRadius`, `bottomLeftRadius`  | Pixel values      | 🟢 Stable      |
| `border-top-left-radius`      | `topLeftRadius`                          | Pixel values                                         | 🟢 Stable      |
| `border-top-right-radius`     | `topRightRadius`                         | Pixel values                                         | 🟢 Stable      |
| `border-bottom-left-radius`   | `bottomRightRadius`                      | Pixel values                                         | 🟢 Stable      |
| `border-bottom-right-radius`  | `bottomLeftRadius`                       | Pixel values                                         | 🟢 Stable      |
| `box-shadow`                  | `node.effects`                           | All formats of inner shadows and drop shadows        | 🟢 Stable      |
| `text-shadow`                 | `node.effects`                           | All drop shadow formats                              | 🟢 Stable      |
| `background-blend-mode`       | `node.blendMode`                         | All blend modes                                      | 🟢 Stable      |
| `mix-blend-mode`              | `node.blendMode`                         | All blend modes                                      | 🟢 Stable      |
| `text-decoration`             | `node.textDecoration`                    | Underline, strikethrough, none                       | 🟢 Stable      |
| `display`                     | `node.layoutMode`                        | Autolayout horizontal                                | 🟢 Stable      |
| `text-transform`              | `textNode.textCase`                      | Uppercase, lowercase, title, original                | 🟢 Stable      |
| `flex-direction`              | `node.layoutMode`                        | `row`, `column`                                      | 🟢 Stable      |
| `justify-content`             | `node.primaryAxisAlignItems`             | `flex-start`, `flex-end`, `center`, `space-between`  | 🟡 Beta        |
| `align-items`                 | `node.counterAxisAlignItems`             | `flex-start`, `flex-end`, `center`                   | 🟡 Beta        |
| `flex-wrap`                   | `node.layoutWrap`                        | `nowrap`, `wrap1                                     | 🟢 Stable      |
| `flex-grow`                   | `node.layoutGrow`                        | Numbers                                              | 🟢 Stable      |
| `gap`                         | `node.itemSpacing`                       | Numbers                                              | 🟢 Stable      |
| `padding`                     | `node.paddingTop`, `node.paddingRight`, `node.paddingBottom`, `node.paddingLeft` | One, two, three or four sets of numbered values  | 🟡 Beta      |
| `padding-top`                 | `node.paddingTop`                        | One set of numbered values                           | 🟡 Beta        |
| `padding-right`               | `node.paddingRight`                      | One set of numbered values                           | 🟡 Beta        |
| `padding-bottom`              | `node.paddingBottom`                     | One set of numbered values                           | 🟡 Beta        |
| `padding-left`                | `node.paddingLeft`                       | One set of numbered values                           | 🟡 Beta        |
| `filter`                      | `node.effects`                           | Blur only (layer blur)                               | 🟢 Stable      |
| `backdrop-filter`             | `node.effects`                           | Blur only (background blur)                          | 🟢 Stable      |
| `rotate`                      | `node.rotation`                          | Deg only                                             | 🟡 Beta      |
| `opacity`                     | `node.opacity`                           | 0 -> 1 values                                        | 🟢 Stable      |
| `overflow`                    | `node.clipsContent`                      | `hidden`                                             | 🟢 Stable      |
| `overflow-y`                  | `node.clipsContent`                      | `hidden` (affects x and y)                           | 🟢 Stable      |
| `overflow-x`                  | `node.clipsContent`                      | `hidden` (affects x and y)                           | 🟢 Stable      |
| `width`                       | `node.resize`                            | All color types                                      | 🟢 Stable      |
| `height`                      | `node.resize`                            | All color types                                      | 🟢 Stable      |
| `text-overflow`               | -                                        | Truncate when `ellipsis`                             | ⚪ Todo        |
| `text-clip`                   | -                                        | Text-based gradients                                 | ⚪ Todo        |
| `ul`                          | -                                        | List                                                 | ⚪ Todo        |
| `ol`                          | -                                        | List                                                 | ⚪ Todo        |
| `text-align`                  | -                                        | Text alignment                                       | ⚪ Todo        |
| `letter-spacing`              | -                                        | Letter spacing                                       | ⚪ Todo        |
| `line-height`                 | -                                        | Line height                                          | ⚪ Todo        |
| `font-style`                  | -                                        | Font style                                           | ⚪ Todo        |
| `font-size`                   | -                                        | Font size                                            | ⚪ Todo        |
| `font-weight`                 | -                                        | Font weight                                          | ⚪ Todo        |
| `font-family`                 | -                                        | Font family                                          | ⚪ Todo        |

---

## Development guide

*This plugin is built with [Create Figma Plugin](https://yuanqing.github.io/create-figma-plugin/).*

### Pre-requisites

- [Node.js](https://nodejs.org) – v20
- [Figma desktop app](https://figma.com/downloads/)

### Build the plugin

To build the plugin:

```
$ npm run build
```

This will generate a [`manifest.json`](https://figma.com/plugin-docs/manifest/) file and a `build/` directory containing the JavaScript bundle(s) for the plugin.

To watch for code changes and rebuild the plugin automatically:

```
$ npm run watch
```

### Install the plugin

1. In the Figma desktop app, open a Figma document.
2. Search for and run `Import plugin from manifest…` via the Quick Actions search bar.
3. Select the `manifest.json` file that was generated by the `build` script.

### Debugging

Use `console.log` statements to inspect values in your code.

To open the developer console, search for and run `Show/Hide Console` via the Quick Actions search bar.

## See also

- [Create Figma Plugin docs](https://yuanqing.github.io/create-figma-plugin/)
- [`yuanqing/figma-plugins`](https://github.com/yuanqing/figma-plugins#readme)

Official docs and code samples from Figma:

- [Plugin API docs](https://figma.com/plugin-docs/)
- [`figma/plugin-samples`](https://github.com/figma/plugin-samples#readme)

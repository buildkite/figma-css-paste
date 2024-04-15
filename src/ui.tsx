import { render, useWindowResize, Button } from "@create-figma-plugin/ui";
import { JSX, h } from "preact";
import "!./output.css";
import { emit } from "@create-figma-plugin/utilities";
import { useEffect, useState } from "preact/hooks";

function Plugin() {
  function onWindowResize(windowSize: { width: number; height: number }) {
    emit("RESIZE_WINDOW", windowSize);
  }

  useWindowResize(onWindowResize, {
    minWidth: 300,
    minHeight: 300,
    maxWidth: 500,
    maxHeight: 500,
  });

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    console.log(`Current value state: ${value}`);
  }, [value]);

  function parseCss(css: string): { [key: string]: string } {
    const properties = css
      .split(";")
      .map((prop) => prop.split(":").map((x) => x.trim()))
      .filter((prop) => prop.length >= 2);

    // Convert the properties into an object
    const cssObj: { [key: string]: string } = Object.fromEntries(properties);

    // Reorder the properties to ensure 'color' comes first
    const orderedCssObj: { [key: string]: string } = {};
    if (cssObj["color"]) {
      orderedCssObj["color"] = cssObj["color"];
      delete cssObj["color"];
    }
    return { ...orderedCssObj, ...cssObj };
  }

  function handleBlur(event: JSX.TargetedEvent<HTMLTextAreaElement>) {
    const rawCSS = event.currentTarget.value;

    // Reorder CSS properties
    const parsedCSS = parseCss(rawCSS);

    // Convert CSS properties back to a valid CSS string format
    let newCSS = "";
    for (const property in parsedCSS) {
      newCSS += `${property}: ${parsedCSS[property]};\n`;
    }

    setValue(newCSS);
  }

  function handleInput(event: JSX.TargetedEvent<HTMLTextAreaElement>) {
    const newValue = event.currentTarget.value;
    setValue(newValue);
  }

  const handleClick = () => {
    emit("APPLY_CSS", value);
  };

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <textarea
        placeholder="Paste your CSS or Tailwind classes"
        onInput={handleInput}
        onBlur={handleBlur}
        value={value}
        className="p-2 h-full rounded-sm focus:ring-2 ring-figma-gray bg-transparent focus:ring-figma-blue hover:ring-figma-gray-light ring-1 focus:bg-transparent"
      />
      <Button fullWidth onClick={handleClick}>
        Apply Styles
      </Button>
    </div>
  );
}

export default render(Plugin);

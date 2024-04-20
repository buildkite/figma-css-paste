import { render, useWindowResize, Button } from "@create-figma-plugin/ui";
import { JSX, h } from "preact";
import "!./output.css";
import { emit } from "@create-figma-plugin/utilities";
import { useState } from "preact/hooks";
import { parseCss } from "./utils/extractStyles";

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
  const [message, setMessage] = useState<string>("Apply Styles");

  // Reorder CSS so color it's first before submission because Figma things
  function handleBlur(event: JSX.TargetedEvent<HTMLTextAreaElement>) {
    const rawCSS = event.currentTarget.value;
    const parsedCSS = parseCss(rawCSS);

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

  function handleClick() {
    try {
      emit("APPLY_CSS", value);
      setMessage("Styles applied successfully!");
    } catch (error) {
      setMessage("An error occurred while applying styles");
    }
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="absolute bottom-4 left-4 right-4 w-auto">
        <Button fullWidth onClick={handleClick}>
          {message}
        </Button>
      </div>
      <textarea
        placeholder="// Paste your CSS"
        onInput={handleInput}
        onBlur={handleBlur}
        value={value}
        className="p-2 h-full bg-[#2C2C2C] text-lime-300 font-mono placeholder:text-white placeholder:text-opacity-30"
      />
    </div>
  );
}

export default render(Plugin);

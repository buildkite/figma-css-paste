import { render, useWindowResize, Button } from "@create-figma-plugin/ui";
import { JSX, h } from "preact";
import "!./output.css";
import { emit } from "@create-figma-plugin/utilities";
import { useEffect, useRef, useState } from "preact/hooks";
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
  const [originalValue, setOriginalValue] = useState<string>("");
  const [formattedValue, setFormattedValue] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const textAreaRef = useRef<HTMLInputElement>(null);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    window.onmessage = (event) => {
      if (event.data.pluginMessage.type === "INITIAL") {
        setDisabled(event.data.pluginMessage.isDisabled);
      } else if (event.data.pluginMessage.type === "selectionChanged") {
        setDisabled(event.data.pluginMessage.disabled);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  function handleInput(event: JSX.TargetedEvent<HTMLTextAreaElement>) {
    const newValue = event.currentTarget.value;
    setOriginalValue(newValue);
  }

  function handleClick() {
    const rawCSS = originalValue
      .split("\n")
      .map((line) => {
        const [property, ...valueParts] = line.split(" ");
        return `${property}: ${valueParts.join(" ")};`;
      })
      .join("\n");

    const parsedCSS = parseCss(rawCSS);
    let formattedCSS = "";
    for (const property in parsedCSS) {
      formattedCSS += `${property}: ${parsedCSS[property]};\n`;
    }

    if (textAreaRef.current) {
      textAreaRef.current.value = formattedCSS;
    }

    try {
      emit("APPLY_CSS", formattedCSS);
      setMessage("Styles applied successfully!");

      const id = setTimeout(() => {
        setMessage("Apply Styles");
      }, 1000);

      setTimeoutId(id);
    } catch (error) {
      setMessage("An error occurred while applying styles");
    }
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="absolute bottom-4 left-4 right-4 w-auto">
        <Button fullWidth onClick={handleClick} disabled={disabled}>
          {message}
        </Button>
      </div>
      <textarea
        ref={textAreaRef}
        placeholder="// Paste your CSS"
        onInput={handleInput}
        defaultValue={value}
        className="p-2 pb-24 h-full bg-[#2C2C2C] text-blue-700 dark:text-lime-300 font-mono dark:placeholder:text-white placeholder:text-opacity-30"
      />
    </div>
  );
}

export default render(Plugin);

import {
  render,
  Container,
  useWindowResize,
  Button,
  TextboxMultiline,
  Stack,
} from "@create-figma-plugin/ui";
import { JSX, h } from "preact";
import "!./output.css";
import { emit } from "@create-figma-plugin/utilities";
import { useState } from "preact/hooks";
import { grow } from "./output.css";

function Plugin(props: { greeting: string }) {
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

  function handleInput(event: JSX.TargetedEvent<HTMLTextAreaElement>) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setValue(newValue);
  }

  function handleClick(event: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    console.log(event);
  }

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <textarea
        placeholder="Paste your CSS or Tailwind classes"
        onInput={handleInput}
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

import chroma from "chroma-js";

export function parseBoxShadow(boxShadow: string): DropShadowEffect | null {
  // Matches different parts of the box-shadow CSS property
  const shadowRegex =
    /([-+]?[\d\.]+)px?\s+([-+]?[\d\.]+)px?\s+([-+]?[\d\.]+)px?\s*(?:([-+]?[\d\.]+)px?)?\s*((rgb\([\d\s,]+\))|(rgba\([\d\s,\.]+\))|(#([0-9a-f]{3}){1,2})|([a-z]+))/i;

  const match = boxShadow.match(shadowRegex);
  if (!match) {
    return null;
  }

  const [, offsetX, offsetY, blur, spread, color] = match;
  const newColor = chroma(color).gl();

  const effect: DropShadowEffect = {
    type: "DROP_SHADOW",
    color: { r: newColor[0], g: newColor[1], b: newColor[2], a: newColor[3] },
    blendMode: "NORMAL",
    offset: {
      x: Number(offsetX),
      y: Number(offsetY),
    },
    radius: Number(blur),
    spread: spread ? Number(spread) : 0, // If spread is optionally provided
    visible: true,
  };

  return effect;
}

export function applyBoxShadow(
  node: BaseNode,
  effect: DropShadowEffect | null
) {
  if ("effects" in node && effect) {
    node.effects = [effect];
  }
}

export function parseBoxShadow2(boxShadow: string): DropShadowEffect | null {
  let splittetInput = "";
  let listOfShadows: string[] = [];
  let listOfInnerShadows: string[] = [];
  let currentShadow = "";

  function splitShadows(inputCSS: string) {
    // Remove Line Breaks if necessary
    inputCSS = inputCSS.replace(/(\r\n|\n|\r)/gm, "");

    // Split Shadows at ) and add ) again for each shadow
    listOfShadows = splittetInput.map((shadow) => shadow + ")").slice(0, -1);

    for (let i = listOfShadows.length - 1; i >= 0; i--) {
      if (listOfShadows[i].includes("inset")) {
        listOfInnerShadows.push(listOfShadows[i]);
        listOfShadows.splice(i, 1);
      }
    }
  }

  function getShadowStyleData(input: string) {
    if (currentShadow.includes("inset")) {
      currentShadow = currentShadow.split("inset ")[1];
    }

    if (currentShadow.includes(", ")) {
      currentShadow = currentShadow.slice(1);
    }

    currentShadow = currentShadow.trim().split(" ");

    if (currentShadow.length === 5) {
      outputX = Math.round(parseFloat(currentShadow[0])).toString();
      outputY = Math.round(parseFloat(currentShadow[1])).toString();
      outputBlur = Math.round(parseFloat(currentShadow[2])).toString();
      outputSpread = Math.round(parseFloat(currentShadow[3])).toString();
      outputColor = chroma(currentShadow[4]).hex();
    } else if (currentShadow.length === 4) {
      outputX = Math.round(parseFloat(currentShadow[0])).toString();
      outputY = Math.round(parseFloat(currentShadow[1])).toString();
      outputBlur = Math.round(parseFloat(currentShadow[2])).toString();
      outputColor = chroma(currentShadow[3]).gl();
      outputSpread = "0";
    }
  }

  const effect: DropShadowEffect = {
    type: "DROP_SHADOW",
    color: {
      r: outputColor[0],
      g: outputColor[1],
      b: outputColor[2],
      a: outputColor[3],
    },
    blendMode: "NORMAL",
    offset: {
      x: Number(outputX),
      y: Number(outputY),
    },
    radius: Number(outputBlur),
    spread: outputSpread ? Number(outputSpread) : 0, // If spread is optionally provided
    visible: true,
  };

  return effect;
}

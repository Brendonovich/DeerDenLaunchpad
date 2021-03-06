export const hsvToHex = ([h, s, v]: number[], fullRange = false): string => {
  let r: number,
    g: number,
    b: number,
    i = Math.floor(h * 6),
    f = h * 6 - i,
    p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  r = Math.round(r! * (fullRange ? 255 : 63));
  g = Math.round(g! * (fullRange ? 255 : 63));
  b = Math.round(b! * (fullRange ? 255 : 63));

  return `${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

export const fullTo18bit = (full: string) => {
  let r = full.slice(0, 2),
    g = full.slice(2, 4),
    b = full.slice(4, 6);

  let newR = Math.floor(parseInt(r, 16) / 4),
    newG = Math.floor(parseInt(g, 16) / 4),
    newB = Math.floor(parseInt(b, 16) / 4);

  return `${newR.toString(16).padStart(2, "0")}${newG
    .toString(16)
    .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};

export const squashFullHex = (full: string) => {
  full = fullTo18bit(full);

  let r = full.slice(0, 2),
    g = full.slice(2, 4),
    b = full.slice(4, 6);

  let newR = Math.round(parseInt(r, 16) * 4),
    newG = Math.round(parseInt(g, 16) * 4),
    newB = Math.round(parseInt(b, 16) * 4);

  return `${newR.toString(16).padStart(2, "0")}${newG
    .toString(16)
    .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};

export const rgbToHsv = ([r, g, b]: number[]) => {
  r /= 255;
  g /= 255;
  b /= 255;

  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h = 0,
    s,
    v = max;

  var d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) h = 0;
  // achromatic
  else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h! /= 6;
  }

  return [h!, s, v];
};

export const hexToRgb = (hex: string) => [
  parseInt(hex.slice(0, 2), 16),
  parseInt(hex.slice(2, 4), 16),
  parseInt(hex.slice(4, 6), 16),
];

export const lpColor = (rg: [number, number]) =>
  `rgb(${(240 * rg[0]) / 3}, ${(240 * rg[1]) / 3}, 0)`;

export const flattenObject = (options: any, recursion = 0) => {
  let flattened: any = {};
  Object.entries(options).forEach(([name, value]) => {
    let children: any;
    if (value !== false) {
      children = flattenObject(value, recursion + 1);
    }
    flattened = { ...flattened, ...children };
  });
  return flattened;
};

export const portNeutralize = (x: string) =>
  x.toUpperCase().split("IN").join("").split("OUT").join("");
export const portsMatch = (input: string, output: string) =>
  portNeutralize(input) === portNeutralize(output);

export type Bubble = {
  id: number;
  label: string;
  value: number;
  color: string;
  image?: string;
  start: { x: number; y: number; r: number };
  middle: { x: number; y: number; r: number };
  end: { x: number; y: number; r: number };
};

const purple = ["#f0e7ff", "#dfc9ff", "#c9a4ff", "#a86ef2", "#7f3ccf", "#5b22a0"];

const imageOne = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
  <rect width="300" height="300" fill="#f6efff"/>
  <circle cx="84" cy="88" r="74" fill="#b98aff"/>
  <circle cx="212" cy="126" r="92" fill="#7a35c7"/>
  <path d="M0 218c54-34 103-43 148-27s90 11 152-28v137H0z" fill="#d9c3ff"/>
</svg>`);

const imageTwo = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
  <rect width="300" height="300" fill="#fff"/>
  <path d="M0 0h300v300H0z" fill="#efe4ff"/>
  <path d="M34 236 150 30l116 206z" fill="#8a43d1"/>
  <path d="M83 233 150 92l67 141z" fill="#caa8ff"/>
</svg>`);

const imageThree = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
  <rect width="300" height="300" fill="#eadcff"/>
  <path d="M0 128c39-24 80-24 124 0s91 24 142 0 90-24 120 0v172H0z" fill="#6f2cb6"/>
  <circle cx="64" cy="75" r="36" fill="#fff"/>
  <circle cx="222" cy="86" r="54" fill="#b177f0"/>
</svg>`);

const imageFour = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
  <rect width="300" height="300" fill="#f8f4ff"/>
  <rect x="38" y="38" width="224" height="224" rx="44" fill="#7e35c4"/>
  <circle cx="104" cy="106" r="38" fill="#d8c0ff"/>
  <circle cx="190" cy="182" r="58" fill="#b177f0"/>
</svg>`);

const imageUris = [
  `data:image/svg+xml;charset=utf-8,${imageOne}`,
  `data:image/svg+xml;charset=utf-8,${imageTwo}`,
  `data:image/svg+xml;charset=utf-8,${imageThree}`,
  `data:image/svg+xml;charset=utf-8,${imageFour}`,
];

const seeded = (index: number) => {
  const value = Math.sin(index * 999.91) * 10000;
  return value - Math.floor(value);
};

const packedPositions = [
  [500, 330, 94],
  [656, 372, 78],
  [415, 455, 70],
  [572, 500, 64],
  [762, 478, 48],
  [314, 344, 46],
  [727, 272, 42],
  [460, 210, 40],
  [612, 222, 38],
  [310, 508, 36],
  [810, 360, 35],
  [678, 565, 34],
  [390, 270, 32],
  [508, 624, 31],
  [258, 422, 30],
  [850, 520, 29],
];

export const bubbles: Bubble[] = Array.from({ length: 120 }, (_, index) => {
  const isHero = index < 4;
  const grid = index - packedPositions.length;
  const ring = Math.floor(grid / 20);
  const slot = grid % 20;
  const angle = (slot / 20) * Math.PI * 2 + ring * 0.31;
  const radius = 230 + ring * 42 + seeded(index + 11) * 28;
  const endRadius = isHero ? packedPositions[index][2] : index < packedPositions.length ? packedPositions[index][2] : 10 + seeded(index + 3) * 13;

  return {
    id: index,
    label: isHero ? ["Innsikt", "Vekst", "Mønster", "Kontekst"][index] : `Boble ${index + 1}`,
    value: Math.round(endRadius * 3.2),
    color: purple[index % purple.length],
    image: isHero ? imageUris[index] : undefined,
    start: {
      x: 70 + seeded(index + 1) * 1060,
      y: 70 + seeded(index + 2) * 620,
      r: 8 + seeded(index + 4) * 19,
    },
    middle: {
      x: 600 + Math.cos(index * 2.399) * (45 + seeded(index + 5) * 165),
      y: 390 + Math.sin(index * 2.399) * (40 + seeded(index + 6) * 135),
      r: 11 + seeded(index + 7) * 16,
    },
    end: {
      x: index < packedPositions.length ? packedPositions[index][0] : 600 + Math.cos(angle) * radius,
      y: index < packedPositions.length ? packedPositions[index][1] : 390 + Math.sin(angle) * radius * 0.72,
      r: endRadius,
    },
  };
});

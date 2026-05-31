const root = document.getElementById("root");
const width = 1200;
const height = 780;
const purple = ["#f0e7ff", "#dfc9ff", "#c9a4ff", "#a86ef2", "#7f3ccf", "#5b22a0"];
const labels = ["Innsikt", "Vekst", "Monster", "Kontekst"];

const packed = [
  [555, 382, 132],
  [730, 382, 78],
  [430, 520, 72],
  [430, 254, 68],
  [666, 248, 50],
  [775, 510, 48],
  [332, 386, 46],
  [576, 570, 44],
  [552, 204, 40],
  [850, 398, 38],
  [700, 590, 36],
  [328, 504, 35],
  [800, 292, 34],
  [470, 662, 32],
  [348, 282, 31],
  [902, 492, 30],
  [624, 672, 28],
  [250, 432, 27],
  [872, 318, 26],
  [512, 112, 25],
  [254, 558, 24],
  [736, 690, 23],
  [930, 408, 22],
  [304, 224, 21],
];

const seeded = (index) => {
  const value = Math.sin(index * 999.91) * 10000;
  return value - Math.floor(value);
};

const clamp = (value) => Math.min(1, Math.max(0, value));
const ease = (value) => {
  const t = clamp(value);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
const mix = (from, to, amount) => from + (to - from) * amount;

const images = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#f6efff"/><circle cx="84" cy="88" r="74" fill="#b98aff"/><circle cx="212" cy="126" r="92" fill="#7a35c7"/><path d="M0 218c54-34 103-43 148-27s90 11 152-28v137H0z" fill="#d9c3ff"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#efe4ff"/><path d="M34 236 150 30l116 206z" fill="#8a43d1"/><path d="M83 233 150 92l67 141z" fill="#caa8ff"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#eadcff"/><path d="M0 128c39-24 80-24 124 0s91 24 142 0 90-24 120 0v172H0z" fill="#6f2cb6"/><circle cx="64" cy="75" r="36" fill="#fff"/><circle cx="222" cy="86" r="54" fill="#b177f0"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#f8f4ff"/><rect x="38" y="38" width="224" height="224" rx="44" fill="#7e35c4"/><circle cx="104" cy="106" r="38" fill="#d8c0ff"/><circle cx="190" cy="182" r="58" fill="#b177f0"/></svg>`,
].map((svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);

const bubbles = Array.from({ length: 120 }, (_, index) => {
  const grid = index - packed.length;
  const ring = Math.floor(Math.max(0, grid) / 24);
  const slot = Math.max(0, grid) % 24;
  const angle = (slot / 24) * Math.PI * 2 + ring * 0.21;
  const radius = 260 + ring * 34 + seeded(index + 11) * 18;
  const endRadius = index < packed.length ? packed[index][2] : 10 + seeded(index + 3) * 13;

  return {
    id: index,
    label: labels[index],
    color: purple[index % purple.length],
    image: index < 4 ? images[index] : null,
    start: {
      x: 70 + seeded(index + 1) * 1060,
      y: 70 + seeded(index + 2) * 620,
      r: 8 + seeded(index + 4) * 19,
    },
    middle: {
      x: 600 + Math.cos(index * 2.399) * (38 + seeded(index + 5) * 125),
      y: 390 + Math.sin(index * 2.399) * (32 + seeded(index + 6) * 104),
      r: 12 + seeded(index + 7) * 14,
    },
    end: {
      x: index < packed.length ? packed[index][0] : 600 + Math.cos(angle) * radius,
      y: index < packed.length ? packed[index][1] : 390 + Math.sin(angle) * radius * 0.72,
      r: endRadius,
    },
  };
});

root.innerHTML = `
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; background: #fff; color: #20142d; font-family: Inter, system-ui, sans-serif; }
    body { min-width: 1024px; }
    main { min-height: 340vh; }
    .intro { width: min(920px, calc(100% - 96px)); margin: 0 auto; padding: 72px 0 12px; }
    .eyebrow { margin: 0 0 12px; color: #7c38c4; font-size: .78rem; font-weight: 800; text-transform: uppercase; }
    h1 { max-width: 740px; margin: 0; color: #251432; font-size: 4.7rem; line-height: .95; letter-spacing: 0; }
    .lede { max-width: 690px; margin: 26px 0 0; color: #65566f; font-size: 1.18rem; line-height: 1.7; }
    .stage { position: sticky; top: 0; height: 100vh; display: grid; align-items: center; padding: 96px 48px 82px; }
    svg { display: block; width: min(1180px, calc(100vw - 96px)); margin: 0 auto; overflow: visible; }
    .status { position: fixed; top: 28px; right: 32px; width: 220px; display: grid; gap: 10px; padding: 14px 16px; border: 1px solid #eadcfb; border-radius: 8px; background: rgba(255,255,255,.82); box-shadow: 0 18px 50px rgba(67,30,94,.1); color: #542281; font-weight: 800; }
    .track { height: 6px; overflow: hidden; border-radius: 999px; background: #efe6fb; }
    .bar { height: 100%; border-radius: inherit; background: linear-gradient(90deg,#b178f0,#61209c); width: 0%; }
    .step { width: 320px; margin-left: max(56px, calc((100vw - 1120px) / 2)); padding: 40vh 0 34vh; }
    .step:nth-of-type(3) { margin-left: auto; margin-right: max(56px, calc((100vw - 1120px) / 2)); }
    .step span { display: block; margin-bottom: 14px; color: #8c57c5; font-size: .82rem; font-weight: 900; }
    .step h2 { margin: 0; color: #2b173b; font-size: 2rem; line-height: 1.05; }
    .step p { margin: 14px 0 0; color: #65566f; line-height: 1.65; }
    .legend { position: sticky; bottom: 0; display: flex; justify-content: center; gap: 32px; padding: 18px 32px; border-top: 1px solid #eadcfb; background: rgba(255,255,255,.9); color: #594466; font-size: .95rem; font-weight: 700; }
    .legend div { display: inline-flex; align-items: center; gap: 10px; }
    .dot { width: 16px; height: 16px; border-radius: 50%; }
    .dotLight { background: #dfc9ff; }
    .dotDark { background: #6f2cb6; }
    .dotImage { border: 3px solid #5b22a0; background: #f7f0ff; }
    text { fill: #3a1b55; font-size: 22px; font-weight: 800; }
  </style>
  <main>
    <header class="intro">
      <p class="eyebrow">Scrollytelling</p>
      <h1>Bobler finner form</h1>
      <p class="lede">Scroll nedover for aa la 120 lilla bobler flyte fra et tilfeldig felt til en samlet klynge og videre inn i et pakket boblediagram med bildeklipp i de storste sirklene.</p>
    </header>
    <section class="stage">
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Scrollstyrt boblediagram">
        <defs>
          <filter id="softShadowFallback" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#5b22a0" flood-opacity="0.12" />
          </filter>
          ${bubbles
            .filter((bubble) => bubble.image)
            .map((bubble) => `<clipPath id="fallbackClip${bubble.id}"><circle data-clip="${bubble.id}" /></clipPath>`)
            .join("")}
        </defs>
        <rect width="${width}" height="${height}" fill="#ffffff"></rect>
        <g filter="url(#softShadowFallback)" id="bubbleLayer"></g>
      </svg>
      <div class="status"><span id="statusText">Spredt</span><div class="track"><div class="bar" id="bar"></div></div></div>
    </section>
    <section class="step"><span>01</span><h2>Start</h2><p>Boblene ligger lost over flaten, med ulike storrelser og nyanser.</p></section>
    <section class="step"><span>02</span><h2>Midt</h2><p>De trekker mot sentrum og danner en tettere, mykere sky.</p></section>
    <section class="step"><span>03</span><h2>Slutt</h2><p>Diagrammet lander i en pakket form der de storste boblene faar bilder klippet inn i sirklene.</p></section>
  </main>
  <footer class="legend"><div><i class="dot dotLight"></i>Smaa datapunkter</div><div><i class="dot dotDark"></i>Store datapunkter</div><div><i class="dot dotImage"></i>Bildebobler</div></footer>
`;

const layer = document.getElementById("bubbleLayer");
const nodes = bubbles.map((bubble) => {
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const outline = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  const fill = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  const image = bubble.image ? document.createElementNS("http://www.w3.org/2000/svg", "image") : null;
  const label = bubble.image ? document.createElementNS("http://www.w3.org/2000/svg", "text") : null;

  outline.setAttribute("fill", bubble.image ? "#5b22a0" : bubble.color);
  outline.setAttribute("opacity", bubble.image ? "0.92" : "0.72");
  group.appendChild(outline);

  if (bubble.image && image && label) {
    fill.setAttribute("fill", bubble.color);
    fill.setAttribute("opacity", "0.78");
    image.setAttribute("href", bubble.image);
    image.setAttribute("clip-path", `url(#fallbackClip${bubble.id})`);
    image.setAttribute("preserveAspectRatio", "xMidYMid slice");
    label.setAttribute("text-anchor", "middle");
    label.textContent = bubble.label;
    group.append(fill, image, label);
  }

  layer.appendChild(group);
  return { bubble, outline, fill, image, label, clip: document.querySelector(`[data-clip="${bubble.id}"]`) };
});

const stateFor = (progress) => {
  if (progress < 0.55) return ["start", "middle", ease(progress / 0.55)];
  return ["middle", "end", ease((progress - 0.55) / 0.45)];
};

const draw = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? clamp(window.scrollY / scrollable) : 0;
  const [fromKey, toKey, amount] = stateFor(progress);
  const imageOpacity = ease((progress - 0.75) / 0.18);
  const labelOpacity = ease((progress - 0.84) / 0.12);

  document.getElementById("bar").style.width = `${Math.round(progress * 100)}%`;
  document.getElementById("statusText").textContent = progress < 0.34 ? "Spredt" : progress < 0.68 ? "Samlet" : "Pakket";

  nodes.forEach(({ bubble, outline, fill, image, label, clip }) => {
    const from = bubble[fromKey];
    const to = bubble[toKey];
    const x = mix(from.x, to.x, amount);
    const y = mix(from.y, to.y, amount);
    const r = mix(from.r, to.r, amount);

    outline.setAttribute("cx", x);
    outline.setAttribute("cy", y);
    outline.setAttribute("r", bubble.image ? r + 3 : r);

    if (fill && image && label && clip) {
      const imageSize = r * 2.08;
      fill.setAttribute("cx", x);
      fill.setAttribute("cy", y);
      fill.setAttribute("r", r);
      fill.setAttribute("opacity", 0.78 * (1 - imageOpacity));
      image.setAttribute("x", x - imageSize / 2);
      image.setAttribute("y", y - imageSize / 2);
      image.setAttribute("width", imageSize);
      image.setAttribute("height", imageSize);
      image.setAttribute("opacity", imageOpacity);
      clip.setAttribute("cx", x);
      clip.setAttribute("cy", y);
      clip.setAttribute("r", r);
      label.setAttribute("x", x);
      label.setAttribute("y", y + r + 24);
      label.setAttribute("opacity", labelOpacity);
    }
  });
};

let frame = 0;
const schedule = () => {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(draw);
};

window.addEventListener("scroll", schedule, { passive: true });
window.addEventListener("resize", schedule);
draw();

import { motion } from "framer-motion";
import { bubbles } from "./data";

type BubbleChartProps = {
  progress: number;
};

const VIEWBOX = { width: 1200, height: 780 };

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const ease = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;

const staged = (progress: number) => {
  if (progress < 0.5) {
    return { from: "start" as const, to: "middle" as const, amount: ease(progress / 0.5) };
  }

  return { from: "middle" as const, to: "end" as const, amount: ease((progress - 0.5) / 0.5) };
};

export function BubbleChart({ progress }: BubbleChartProps) {
  const transition = staged(progress);

  return (
    <section className="chartShell" aria-label="Scrollstyrt boblediagram">
      <svg className="bubbleSvg" viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} role="img">
        <defs>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#5b22a0" floodOpacity="0.12" />
          </filter>
          {bubbles
            .filter((bubble) => bubble.image)
            .map((bubble) => {
              const from = bubble[transition.from];
              const to = bubble[transition.to];
              const x = mix(from.x, to.x, transition.amount);
              const y = mix(from.y, to.y, transition.amount);
              const r = mix(from.r, to.r, transition.amount);

              return (
                <clipPath id={`clip-${bubble.id}`} key={bubble.id}>
                  <motion.circle animate={{ cx: x, cy: y, r }} transition={{ duration: 0.22, ease: "easeOut" }} />
                </clipPath>
              );
            })}
        </defs>

        <rect width={VIEWBOX.width} height={VIEWBOX.height} fill="#ffffff" />
        <g filter="url(#softShadow)">
          {bubbles.map((bubble) => {
            const from = bubble[transition.from];
            const to = bubble[transition.to];
            const x = mix(from.x, to.x, transition.amount);
            const y = mix(from.y, to.y, transition.amount);
            const r = mix(from.r, to.r, transition.amount);
            const imageSize = r * 2.08;

            return (
              <g key={bubble.id}>
                {bubble.image ? (
                  <>
                    <motion.circle
                      animate={{ cx: x, cy: y, r: r + 3 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      fill="#5b22a0"
                      opacity={0.92}
                    />
                    <motion.image
                      href={bubble.image}
                      clipPath={`url(#clip-${bubble.id})`}
                      preserveAspectRatio="xMidYMid slice"
                      animate={{ x: x - imageSize / 2, y: y - imageSize / 2, width: imageSize, height: imageSize }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    />
                    <motion.text
                      animate={{ x, y: y + r + 24, opacity: progress > 0.74 ? 1 : 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="bubbleLabel"
                      textAnchor="middle"
                    >
                      {bubble.label}
                    </motion.text>
                  </>
                ) : (
                  <motion.circle
                    animate={{ cx: x, cy: y, r }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    fill={bubble.color}
                    opacity={0.72}
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </section>
  );
}

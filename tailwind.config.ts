import type { Config } from "tailwindcss";

// All brand colors point at CSS variables defined once in app/globals.css.
// To re-theme the whole site, edit the hex values in globals.css — nothing
// here needs to change.
//
// Each color is a function so opacity modifiers work too (e.g. bg-jade/10,
// from-ink/90): Tailwind passes the opacity and we blend the variable with
// transparent using color-mix. A plain "var(--x)" string silently drops them.
type ColorFn = (opts: { opacityValue?: string }) => string;
const brand = (name: string): ColorFn => ({ opacityValue }) =>
  opacityValue === undefined || opacityValue === "1"
    ? `var(${name})`
    : `color-mix(in srgb, var(${name}) calc(${opacityValue} * 100%), transparent)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: brand("--color-ink"),
        "ink-soft": brand("--color-ink-soft"),
        jade: {
          DEFAULT: brand("--color-jade"),
          deep: brand("--color-jade-deep"),
        },
        gold: brand("--color-gold"),
        paper: {
          DEFAULT: brand("--color-paper"),
          raised: brand("--color-paper-raised"),
        },
        line: brand("--color-line"),
        muted: brand("--color-muted"),
      } as unknown as Record<string, string>,
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-public-sans)", "-apple-system", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        brand: "0 20px 50px -25px rgba(20,35,31,0.35)",
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};

export default config;

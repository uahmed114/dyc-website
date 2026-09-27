import type { Config } from "tailwindcss";

// All brand colors point at CSS variables defined once in app/globals.css.
// To re-theme the whole site, edit the values in globals.css — nothing here
// needs to change.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        "ink-soft": "var(--color-ink-soft)",
        jade: {
          DEFAULT: "var(--color-jade)",
          deep: "var(--color-jade-deep)",
        },
        gold: "var(--color-gold)",
        paper: {
          DEFAULT: "var(--color-paper)",
          raised: "var(--color-paper-raised)",
        },
        line: "var(--color-line)",
        muted: "var(--color-muted)",
      },
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

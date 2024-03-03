/** @type {import('tailwindcss').Config} */
import { blue, white as _white, gray } from "tailwindcss/colors";
export const darkMode = ["class"];
export const content = [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
    container: {
        center: true,
        padding: "2rem",
        screens: {
            "2xl": "1400px",
        },
    },
    extend: {
        maxWidth: {
            "8xl": "90rem",
        },
        colors: {
            primary: {
                50: "#EEF5FB",
                100: "#5597DA",
                200: "#448DD6",
                300: "#3382D2",
                400: "#2B78C5",
                500: "#276DB4",
                600: "#2566A7",
                700: "#225E9A",
                800: "#1F568D",
                900: "#1C4E80",
            },
            secondary: "#ACF2FF",
            surface: "#EEF5FB",
            white: "#fff",
            black: "#000",
            "surface-600": "E4F0F6",
            tremor: {
                brand: {
                    faint: blue[50],
                    muted: blue[200],
                    subtle: blue[400],
                    DEFAULT: blue[500],
                    emphasis: blue[700],
                    inverted: _white,
                },
                background: {
                    muted: gray[50],
                    subtle: gray[100],
                    DEFAULT: _white,
                    emphasis: gray[700],
                },
                border: {
                    DEFAULT: gray[200],
                },
                ring: {
                    DEFAULT: gray[200],
                },
                content: {
                    subtle: gray[400],
                    DEFAULT: gray[500],
                    emphasis: gray[700],
                    strong: gray[900],
                    inverted: _white,
                },
                "dark-tremor": {
                    brand: {
                        faint: "#0B1229",
                        muted: blue[950],
                        subtle: blue[800],
                        DEFAULT: blue[500],
                        emphasis: blue[400],
                        inverted: blue[950],
                    },
                    background: {
                        muted: "#131A2B",
                        subtle: gray[800],
                        DEFAULT: gray[900],
                        emphasis: gray[300],
                    },
                    border: {
                        DEFAULT: gray[700],
                    },
                    ring: {
                        DEFAULT: gray[800],
                    },
                    content: {
                        subtle: gray[600],
                        DEFAULT: gray[500],
                        emphasis: gray[200],
                        strong: gray[50],
                        inverted: gray[950],
                    },
                },
            },
        },
        borderRadius: {
            "tremor-small": "0.375rem",
            "tremor-default": "1rem",
            "tremor-full": "9999px",
        },
        fontSize: {
            "tremor-label": ["0.75rem"],
            "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
            "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
            "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
        },
        boxShadow: {
            // light
            "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            // dark
            "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            "dark-tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            "dark-tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        },
        keyframes: {
            "accordion-down": {
                from: { height: 0 },
                to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: 0 },
            },
        },
        animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
        },
    },
};
export const safelist = [
    {
        pattern: /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        variants: ["hover", "ui-selected"],
    },
    {
        pattern: /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        variants: ["hover", "ui-selected"],
    },
    {
        pattern: /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        variants: ["hover", "ui-selected"],
    },
    {
        pattern: /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
        pattern: /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
        pattern: /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
];
export const plugins = [require("tailwindcss-animate")];
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-dark": "rgb(var(--primary-dark) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        "text-light": "rgb(var(--text-light) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        "background-alt": "rgb(var(--background-alt) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
      },
      boxShadow: {
        DEFAULT: "var(--shadow)",
      },
      borderRadius: {
        DEFAULT: "var(--border-radius)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
  important: true,
  safelist: [
    "bg-background",
    {
      pattern: /bg-(background|primary|secondary|accent|success|error)\/[0-9]+/,
    },
    {
      pattern: /text-(text-light|success|error)\/[0-9]+/,
    },
  ],
};
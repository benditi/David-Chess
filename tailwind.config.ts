import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black_cell: "#779556",
        white_cell: "#ebecd0",
        openGrey: "#00000024",
      },
    },
  },
  plugins: [],
} satisfies Config;

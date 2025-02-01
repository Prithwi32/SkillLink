/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(110deg, white 50%, #4338CA 50%)",
      },
      animation: {
        ringA: "ringA 2s linear infinite",
        ringB: "ringB 2s linear infinite",
        ringC: "ringC 2s linear infinite",
        ringD: "ringD 2s linear infinite",
      },
      keyframes: {
        ringA: {
          "from, 4%": {
            strokeDasharray: "0 660",
            strokeWidth: "20",
            strokeDashoffset: "-330",
          },
          "12%": {
            strokeDasharray: "60 600",
            strokeWidth: "30",
            strokeDashoffset: "-335",
          },
          "32%": {
            strokeDasharray: "60 600",
            strokeWidth: "30",
            strokeDashoffset: "-595",
          },
          "40%, 54%": {
            strokeDasharray: "0 660",
            strokeWidth: "20",
            strokeDashoffset: "-660",
          },
          "62%": {
            strokeDasharray: "60 600",
            strokeWidth: "30",
            strokeDashoffset: "-665",
          },
          "82%": {
            strokeDasharray: "60 600",
            strokeWidth: "30",
            strokeDashoffset: "-925",
          },
          "90%, to": {
            strokeDasharray: "0 660",
            strokeWidth: "20",
            strokeDashoffset: "-990",
          },
        },
        ringB: {
          "from, 12%": {
            strokeDasharray: "0 220",
            strokeWidth: "20",
            strokeDashoffset: "-110",
          },
          "20%": {
            strokeDasharray: "20 200",
            strokeWidth: "30",
            strokeDashoffset: "-115",
          },
          "40%": {
            strokeDasharray: "20 200",
            strokeWidth: "30",
            strokeDashoffset: "-195",
          },
          "48%, 62%": {
            strokeDasharray: "0 220",
            strokeWidth: "20",
            strokeDashoffset: "-220",
          },
          "70%": {
            strokeDasharray: "20 200",
            strokeWidth: "30",
            strokeDashoffset: "-225",
          },
          "90%": {
            strokeDasharray: "20 200",
            strokeWidth: "30",
            strokeDashoffset: "-305",
          },
          "98%, to": {
            strokeDasharray: "0 220",
            strokeWidth: "20",
            strokeDashoffset: "-330",
          },
        },
        ringC: {
          from: {
            strokeDasharray: "0 440",
            strokeWidth: "20",
            strokeDashoffset: "0",
          },
          "8%": {
            strokeDasharray: "40 400",
            strokeWidth: "30",
            strokeDashoffset: "-5",
          },
          "28%": {
            strokeDasharray: "40 400",
            strokeWidth: "30",
            strokeDashoffset: "-175",
          },
          "36%, 58%": {
            strokeDasharray: "0 440",
            strokeWidth: "20",
            strokeDashoffset: "-220",
          },
          "66%": {
            strokeDasharray: "40 400",
            strokeWidth: "30",
            strokeDashoffset: "-225",
          },
          "86%": {
            strokeDasharray: "40 400",
            strokeWidth: "30",
            strokeDashoffset: "-395",
          },
          "94%, to": {
            strokeDasharray: "0 440",
            strokeWidth: "20",
            strokeDashoffset: "-440",
          },
        },
        ringD: {
          "from, 8%": {
            strokeDasharray: "0 440",
            strokeWidth: "20",
            strokeDashoffset: "0",
          },
          "16%": {
            strokeDasharray: "40 400",
            strokeWidth: "30",
            strokeDashoffset: "-5",
          },
          "36%": {
            strokeDasharray: "40 400",
            strokeWidth: "30",
            strokeDashoffset: "-175",
          },
          "44%, 50%": {
            strokeDasharray: "0 440",
            strokeWidth: "20",
            strokeDashoffset: "-220",
          },
          "58%": {
            strokeDasharray: "40 400",
            strokeWidth: "30",
            strokeDashoffset: "-225",
          },
          "78%": {
            strokeDasharray: "40 400",
            strokeWidth: "30",
            strokeDashoffset: "-395",
          },
          "86%, to": {
            strokeDasharray: "0 440",
            strokeWidth: "20",
            strokeDashoffset: "-440",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

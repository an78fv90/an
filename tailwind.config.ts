import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.tsx","./components/**/*.tsx"],
  theme: { extend: {
    colors: { plaster:"#F1E8D6", mulberry:"#14100C", bronze:"#C9A24B", mist:"#8A7A55", ink:"#0C0A08" },
    fontFamily: { display:["var(--font-display)","serif"], body:["var(--font-body)","sans-serif"] } } },
  plugins: [] } satisfies Config;

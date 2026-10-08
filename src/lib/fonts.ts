import { Newsreader, Instrument_Sans, Noto_Naskh_Arabic, Noto_Serif_SC } from "next/font/google";

export const serif = Newsreader({ subsets: ["latin", "latin-ext"], variable: "--f-serif", display: "swap" });
export const sans = Instrument_Sans({ subsets: ["latin", "latin-ext"], variable: "--f-sans", display: "swap" });
export const arabic = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--f-ar", display: "swap" });
export const chinese = Noto_Serif_SC({ weight: ["400", "700"], variable: "--f-zh", display: "swap", preload: false });

export const fontVariables = [serif.variable, sans.variable, arabic.variable, chinese.variable].join(" ");

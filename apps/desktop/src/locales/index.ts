import { zhTW } from "./zh-TW";

export type Locale = "en" | "zh-TW";
export type DisplayMode = "pure" | "mixed";

export const locales: Record<Locale, Record<string, string>> = {
	en: {},
	"zh-TW": zhTW,
};

export { zhTW };

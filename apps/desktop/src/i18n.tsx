import { createContext, createSignal, type JSX, useContext } from "solid-js";
import { type DisplayMode, type Locale, locales } from "./locales/index";
export type { Locale, DisplayMode };

interface I18nContextValue {
	locale: () => Locale;
	setLocale: (locale: Locale) => void;
	displayMode: () => DisplayMode;
	setDisplayMode: (mode: DisplayMode) => void;
	t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue>();

const LOCALE_STORAGE_KEY = "cap-locale";
const MODE_STORAGE_KEY = "cap-display-mode";

function loadLocale(): Locale {
	try {
		const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
		if (stored === "zh-TW" || stored === "en") return stored;
	} catch {}
	return "en";
}

function loadDisplayMode(): DisplayMode {
	try {
		const stored = localStorage.getItem(MODE_STORAGE_KEY);
		if (stored === "pure" || stored === "mixed") return stored;
	} catch {}
	return "pure";
}

export function I18nProvider(props: { children: JSX.Element }) {
	const [locale, setLocaleSignal] = createSignal<Locale>(loadLocale());
	const [displayMode, setDisplayModeSignal] = createSignal<DisplayMode>(
		loadDisplayMode(),
	);

	function setLocale(l: Locale) {
		setLocaleSignal(l);
		try {
			localStorage.setItem(LOCALE_STORAGE_KEY, l);
		} catch {}
	}

	function setDisplayMode(m: DisplayMode) {
		setDisplayModeSignal(m);
		try {
			localStorage.setItem(MODE_STORAGE_KEY, m);
		} catch {}
	}

	function t(key: string): string {
		const l = locale();
		if (l === "en") return key;

		const translation = locales[l][key];
		if (!translation) return key;

		if (displayMode() === "mixed") return `${key} (${translation})`;
		return translation;
	}

	return (
		<I18nContext.Provider
			value={{ locale, setLocale, displayMode, setDisplayMode, t }}
		>
			{props.children}
		</I18nContext.Provider>
	);
}

export function useI18n(): I18nContextValue {
	const ctx = useContext(I18nContext);
	if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
	return ctx;
}

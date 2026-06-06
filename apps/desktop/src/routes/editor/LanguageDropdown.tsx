import { DropdownMenu as KDropdownMenu } from "@kobalte/core/dropdown-menu";
import { cx } from "cva";
import { Show } from "solid-js";
import { type DisplayMode, type Locale, useI18n } from "~/i18n";
import {
	EditorButton,
	MenuItem,
	MenuItemList,
	PopperContent,
	topCenterAnimateClasses,
} from "./ui";

export function LanguageSidebarButton() {
	const { t, locale, setLocale, displayMode, setDisplayMode } = useI18n();

	const currentLabel = () => (locale() === "zh-TW" ? "繁中" : "EN");

	const localeOptions: Array<{ value: Locale; label: string }> = [
		{ value: "en", label: "English" },
		{ value: "zh-TW", label: "繁體中文" },
	];

	const modeOptions: Array<{
		value: DisplayMode;
		label: string;
		example: string;
	}> = [
		{ value: "mixed", label: "混合 Mixed", example: "Edit (編輯)" },
		{ value: "pure", label: "純 Pure", example: "編輯" },
	];

	return (
		<KDropdownMenu gutter={8} placement="right-end">
			<KDropdownMenu.Trigger class="w-full flex items-center gap-1.5 px-2 h-8 rounded-lg text-[13px] text-gray-12 hover:bg-gray-3 transition-colors">
				<IconCapCaptions class="opacity-60 size-4" aria-hidden="true" />
				<span class="flex-1 text-left">{t("Language")}</span>
				<span class="text-[11px] font-semibold text-gray-10 bg-gray-3 px-1.5 py-0.5 rounded-md">
					{currentLabel()}
				</span>
			</KDropdownMenu.Trigger>
			<KDropdownMenu.Portal>
				<PopperContent<typeof KDropdownMenu.Content>
					as={KDropdownMenu.Content}
					class={cx("w-52", topCenterAnimateClasses)}
				>
					<div class="px-2 pt-2 pb-1">
						<p class="text-[11px] font-semibold text-gray-10 uppercase tracking-wider px-1.5 mb-1">
							{t("Language")}
						</p>
						<MenuItemList class="flex flex-col gap-0.5">
							{localeOptions.map((opt) => (
								<MenuItem<typeof KDropdownMenu.Item>
									as={KDropdownMenu.Item}
									class={cx(locale() === opt.value && "bg-gray-3 text-gray-12")}
									onSelect={() => setLocale(opt.value)}
								>
									<span class="flex-1">{opt.label}</span>
									<Show when={locale() === opt.value}>
										<IconLucideCheck class="w-3.5 h-3.5 text-blue-9" />
									</Show>
								</MenuItem>
							))}
						</MenuItemList>
					</div>
					<Show when={locale() !== "en"}>
						<div class="border-t border-gray-3 px-2 pt-2 pb-2">
							<p class="text-[11px] font-semibold text-gray-10 uppercase tracking-wider px-1.5 mb-1">
								{t("Display Mode")}
							</p>
							<MenuItemList class="flex flex-col gap-0.5">
								{modeOptions.map((opt) => (
									<MenuItem<typeof KDropdownMenu.Item>
										as={KDropdownMenu.Item}
										class={cx(
											displayMode() === opt.value && "bg-gray-3 text-gray-12",
										)}
										onSelect={() => setDisplayMode(opt.value)}
									>
										<span class="flex-1">{opt.label}</span>
										<span class="text-[11px] text-gray-10 font-mono">
											{opt.example}
										</span>
										<Show when={displayMode() === opt.value}>
											<IconLucideCheck class="w-3.5 h-3.5 text-blue-9" />
										</Show>
									</MenuItem>
								))}
							</MenuItemList>
						</div>
					</Show>
				</PopperContent>
			</KDropdownMenu.Portal>
		</KDropdownMenu>
	);
}

export function LanguageDropdown() {
	const { t, locale, setLocale, displayMode, setDisplayMode } = useI18n();

	const currentLabel = () => (locale() === "zh-TW" ? "繁中" : "EN");

	const localeOptions: Array<{
		value: Locale;
		label: string;
		sublabel: string;
	}> = [
		{ value: "en", label: "English", sublabel: "EN" },
		{ value: "zh-TW", label: "繁體中文", sublabel: "繁中" },
	];

	const modeOptions: Array<{
		value: DisplayMode;
		label: string;
		example: string;
	}> = [
		{ value: "mixed", label: "混合 Mixed", example: "Edit (編輯)" },
		{ value: "pure", label: "純 Pure", example: "編輯" },
	];

	return (
		<KDropdownMenu gutter={8} placement="bottom-end">
			<EditorButton<typeof KDropdownMenu.Trigger>
				as={KDropdownMenu.Trigger}
				rightIcon={<IconCapChevronDown class="w-3" />}
			>
				<span class="text-xs font-semibold">{currentLabel()}</span>
			</EditorButton>

			<KDropdownMenu.Portal>
				<PopperContent<typeof KDropdownMenu.Content>
					as={KDropdownMenu.Content}
					class={cx("w-52", topCenterAnimateClasses)}
				>
					<div class="px-2 pt-2 pb-1">
						<p class="text-[11px] font-semibold text-gray-10 uppercase tracking-wider px-1.5 mb-1">
							{t("Language")}
						</p>
						<MenuItemList class="flex flex-col gap-0.5">
							{localeOptions.map((opt) => (
								<MenuItem<typeof KDropdownMenu.Item>
									as={KDropdownMenu.Item}
									class={cx(locale() === opt.value && "bg-gray-3 text-gray-12")}
									onSelect={() => setLocale(opt.value)}
								>
									<span class="flex-1">{opt.label}</span>
									<Show when={locale() === opt.value}>
										<IconLucideCheck class="w-3.5 h-3.5 text-blue-9" />
									</Show>
								</MenuItem>
							))}
						</MenuItemList>
					</div>

					<Show when={locale() !== "en"}>
						<div class="border-t border-gray-3 px-2 pt-2 pb-2">
							<p class="text-[11px] font-semibold text-gray-10 uppercase tracking-wider px-1.5 mb-1">
								{t("Display Mode")}
							</p>
							<MenuItemList class="flex flex-col gap-0.5">
								{modeOptions.map((opt) => (
									<MenuItem<typeof KDropdownMenu.Item>
										as={KDropdownMenu.Item}
										class={cx(
											displayMode() === opt.value && "bg-gray-3 text-gray-12",
										)}
										onSelect={() => setDisplayMode(opt.value)}
									>
										<span class="flex-1">{opt.label}</span>
										<span class="text-[11px] text-gray-10 font-mono">
											{opt.example}
										</span>
										<Show when={displayMode() === opt.value}>
											<IconLucideCheck class="w-3.5 h-3.5 text-blue-9" />
										</Show>
									</MenuItem>
								))}
							</MenuItemList>
						</div>
					</Show>
				</PopperContent>
			</KDropdownMenu.Portal>
		</KDropdownMenu>
	);
}

import { createResource, Show } from "solid-js";
import { createStore } from "solid-js/store";

import { generalSettingsStore } from "~/store";
import {
	deriveGeneralSettings,
	type GeneralSettingsStore,
} from "~/utils/general-settings";
import {
	Section,
	SectionRows,
	SettingsPageContent,
	ToggleSettingItem,
} from "./Setting";

export default function ImprovementsSettings() {
	const [store] = createResource(() => generalSettingsStore.get());

	return (
		<Show when={store.state === "ready" && ([store()] as const)}>
			{(store) => <Inner initialStore={store()[0] ?? null} />}
		</Show>
	);
}

function Inner(props: {
	initialStore: GeneralSettingsStore | null;
}) {
	const [settings, setSettings] = createStore<GeneralSettingsStore>(
		deriveGeneralSettings(props.initialStore),
	);

	const handleChange = async <K extends keyof typeof settings>(
		key: K,
		value: (typeof settings)[K],
	) => {
		const previousValue = settings[key];
		setSettings(key as keyof GeneralSettingsStore, value);
		try {
			await generalSettingsStore.set({ [key]: value });
		} catch (error) {
			setSettings(key as keyof GeneralSettingsStore, previousValue);
			console.error(`Failed to update ${key}`, error);
		}
	};

	return (
		<div class="cap-settings-page flex flex-col h-full custom-scroll">
			<SettingsPageContent>
				<Section title="Timeline">
					<SectionRows>
						<ToggleSettingItem
							label="Scrub timeline on drag"
							description="Allow dragging the timeline background to smoothly scrub the playhead, similar to professional editing software."
							value={!!settings.enableTimelineScrubbing}
							onChange={(value) =>
								handleChange("enableTimelineScrubbing", value)
							}
						/>
					</SectionRows>
				</Section>
			</SettingsPageContent>
		</div>
	);
}

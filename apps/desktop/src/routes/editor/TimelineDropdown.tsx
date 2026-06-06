import { DropdownMenu as KDropdownMenu } from "@kobalte/core/dropdown-menu";
import { cx } from "cva";
import { useI18n } from "~/i18n";
import { useEditorContext } from "./context";
import {
	DropdownItem,
	EditorButton,
	MenuItemList,
	PopperContent,
	topCenterAnimateClasses,
} from "./ui";

export function TimelineDropdown() {
	const { editorState, setEditorState } = useEditorContext();
	const { t } = useI18n();

	return (
		<KDropdownMenu gutter={8} placement="bottom">
			<EditorButton<typeof KDropdownMenu.Trigger>
				as={KDropdownMenu.Trigger}
				leftIcon={<IconCapFilmCut class="size-4" />}
				rightIcon={<IconCapChevronDown class="size-4" />}
			>
				{t("Timeline")}
			</EditorButton>
			<KDropdownMenu.Portal>
				<PopperContent<typeof KDropdownMenu.Content>
					as={KDropdownMenu.Content}
					class={cx("w-52 max-h-56", topCenterAnimateClasses)}
				>
					<MenuItemList<typeof KDropdownMenu.Group>
						as={KDropdownMenu.Group}
					>
						<DropdownItem
							class="flex items-center justify-between"
							onSelect={(e) => {
								e?.preventDefault();
								setEditorState("timeline", "showZoomCurves", (v) => !v);
							}}
						>
							<span>{t("Show Zoom Curves")}</span>
							{editorState.timeline.showZoomCurves && <IconCapCircleCheck class="size-4 text-blue-500" />}
						</DropdownItem>
					</MenuItemList>
				</PopperContent>
			</KDropdownMenu.Portal>
		</KDropdownMenu>
	);
}

export default TimelineDropdown;

import { AppBarItem } from "@/components/AppBarItem";
import { ChartNoAxesCombined, Edit, Folder, Save } from "lucide-react";

export const HopSensoryEditorActions = ({
  slug,
  disabled,
}: {
  slug?: string;
  disabled?: boolean;
}) => {
  return [
    <AppBarItem
      disabled={disabled}
      key="save"
      text="Save"
      type="submit"
      icon={<Save />}
    />,
  ];
};

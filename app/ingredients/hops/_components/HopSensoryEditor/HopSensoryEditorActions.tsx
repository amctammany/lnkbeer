import { AppBarItem } from "@/components/AppBarItem";
import { ChartNoAxesCombined, Edit, Folder, Save } from "lucide-react";

export const HopSensoryEditorActions = ({ slug }: { slug?: string }) => {
  return [<AppBarItem key="save" text="Save" type="submit" icon={<Save />} />];
};

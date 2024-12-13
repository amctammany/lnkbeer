//"use client";
import { WaterProfile } from "@prisma/client";
import { Activity, Delete, ForkKnife, Redo, Save } from "lucide-react";
import {
  AppBarDropdown,
  AppBarDropdownItem,
} from "@/components/AppBarDropdown";
import { AppBarItem } from "@/components/AppBarItem";
import { removeWaterProfile } from "../../actions";

export type WaterProfileFormActionsProps = {
  src?: WaterProfile | null;
};
export const WaterProfileFormActions = ({
  src,
}: WaterProfileFormActionsProps) => {
  return [
    <AppBarItem key="save" text="Save" type="submit" icon={<Save />} />,
    <AppBarDropdown key="actions" text="Actions" icon={<Save />}>
      <AppBarDropdownItem
        text="Fork"
        url={`/profiles/water/${src?.slug}/fork`}
        icon={<ForkKnife />}
      />
      <AppBarDropdownItem
        text="Remove"
        action={() => {
          removeWaterProfile(src);
        }}
        icon={<Delete />}
      />
    </AppBarDropdown>,
  ];
};

export default WaterProfileFormActions;

"use client";
import { WaterProfile } from "@prisma/client";
import { Activity, Redo, Save } from "lucide-react";
import {
  AppBarDropdown,
  AppBarDropdownItem,
} from "@/components/AppBarDropdown";
import { AppBarItem } from "@/components/AppBarItem";

export type WaterProfileFormActionsProps = {
  src?: WaterProfile | null;
};
export const WaterProfileFormActions = ({
  src,
}: WaterProfileFormActionsProps) => {
  const handleClick = (action) => async (e) => {
    await action(src);
  };

  return [
    <AppBarItem key="save" text="Save" type="submit" icon={<Save />} />,
    <AppBarDropdown key="actions" text="Actions" icon={<Save />}>
      <AppBarDropdownItem
        key="fork"
        text="fork"
        action={handleClick(() => {
          console.log("fork");
        })}
        icon={<Save />}
      />
    </AppBarDropdown>,
  ];
};

export default WaterProfileFormActions;

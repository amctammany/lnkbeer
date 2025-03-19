import { Delete, ForkKnife, Save } from "lucide-react";
import {
  AppBarDropdown,
  AppBarDropdownItem,
} from "@/components/AppBarDropdown";
import { AppBarItem } from "@/components/AppBarItem";
import { removeWaterProfile } from "../../actions";
import { WaterProfileInput } from "@/types/Profile";

export type WaterProfileFormActionsProps = {
  src?: WaterProfileInput | null;
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

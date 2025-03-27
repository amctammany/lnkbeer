"use client";
import {
  AppBarDropdown,
  AppBarDropdownItem,
} from "@/components/AppBarDropdown";
import { AppBarItem } from "@/components/AppBarItem";
import { Activity, Delete, Edit, Save } from "lucide-react";
import { removeYeast } from "../../actions";

export const YeastDisplayActions = ({ slug }: { slug: string }) => {
  return [
    <AppBarItem
      key="edit"
      text="Edit"
      url={`/ingredients/yeasts/${slug}/edit`}
      icon={<Edit />}
    />,
    <AppBarDropdown key="actions" icon={<Activity />} text="Actions">
      <AppBarDropdownItem
        key="fork"
        text="fork"
        url={`/ingredients/yeasts/${slug}/fork`}
        //action={() => {
        //console.log("fork");
        //}}
        icon={<Save />}
      />

      <AppBarDropdownItem
        key="remove"
        text="remove"
        action={() => {
          removeYeast(slug);
        }}
        icon={<Delete />}
      />
    </AppBarDropdown>,
  ];
};

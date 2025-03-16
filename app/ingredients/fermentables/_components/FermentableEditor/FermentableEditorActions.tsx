"use client";
import { AppBarItem } from "@/components/AppBarItem";
import { Save } from "lucide-react";

export const FermentableEditorActions = () => {
  return [<AppBarItem key="save" type="submit" text="Save" icon={<Save />} />];
};
export default FermentableEditorActions;

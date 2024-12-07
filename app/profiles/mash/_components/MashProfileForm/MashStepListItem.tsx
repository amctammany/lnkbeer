/**import { MashStep } from "@prisma/client";
export type MashStepListItemProps = {
  src: MashStep;
};
export function MashStepListItem(props: MashStepListItemProps) {
  return <div className="">{props.src.name}</div>;
}

export default MashStepListItem;
*/
//import { AppIcon } from "@/components/AppIcon";
import { ListItem } from "@/components/List/ListItem";
//import { ListItemActions } from "@/components/List/ListItemActions";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
//import { InlineProp } from "@/components/Prop/InlineProp";
//import { Prop } from "@/components/Prop";
import { MashStep } from "@prisma/client";
import React from "react";
type MashStepTextProps = {
  src: MashStep;
};
export function MashStepText({ src }: MashStepTextProps) {
  return (
    <span className="capitalize">
      {src.type} - {src.time} min @ {src.temperature}
    </span>
  );
}

export type MashStepListItemProps = {
  src: MashStep;
  index: number;
};
export function MashStepListItem({ src, index }: MashStepListItemProps) {
  return (
    <li>
      <MashStepText src={src} />
      <b className="px-2">Ramp Time:</b>
      <span>{src.rampTime} min</span>
    </li>
  );
  /**
  return (
    <ListItem border="none" key={src.id}>
      <ListItemIcon className="w-14">
        <b>{index}</b>
      </ListItemIcon>
      <ListItemText
        primary={<MashStepText src={src} />}
        secondary={
          <>
            <b className="px-2">Ramp Time:</b>
            <span>{src.rampTime} min</span>
          </>
        }
      />
    </ListItem>
  );
   */
}

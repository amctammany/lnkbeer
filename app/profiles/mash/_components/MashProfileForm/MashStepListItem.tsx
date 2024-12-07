import { MashStep } from "@prisma/client";
import React from "react";
import { ExtendedMashStep } from "@/types/Profile";
import Link from "next/link";
type MashStepTextProps = {
  src: MashStep;
};
export function MashStepText({ src }: MashStepTextProps) {
  return (
    <span className="capitalize">
      {src.type} - {src.name} - {src.time} min @ {src.temperature}
    </span>
  );
}

export type MashStepListItemProps = {
  src: ExtendedMashStep | MashStep;
  index: number;
};
export function MashStepListItem({ src, index }: MashStepListItemProps) {
  const Comp = Object.hasOwn(src, "MashProfile") ? Link : "div";
  const props: any =
    Comp === "div"
      ? {}
      : {
          href: `/profiles/mash/${(src as ExtendedMashStep)?.MashProfile?.slug}/edit/${src.id}`,
        };
  return (
    <li>
      <Comp {...props}>
        <MashStepText src={src} />
        <b className="px-2">Ramp Time:</b>
        <span>{src.rampTime} min</span>
      </Comp>
    </li>
  ); /**
      <MashProfileFormContainer src={src} action={updateMashProfile}>
        <Dialog>
          <DialogTrigger>
            <MashStepText src={src} />
            <b className="px-2">Ramp Time:</b>
            <span>{src.rampTime} min</span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[825px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>DialogDescription</DialogDescription>
            </DialogHeader>
            <div>
              <MashStepForm />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </MashProfileFormContainer>
    </li>*/
  //);
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

import { ExtendedHop } from "@/types/ingredient";
import { HopSensory } from "../HopSensory";
//import { HopSensoryChart } from "../HopSensoryChart";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type SensoryTabProps = {
  src: ExtendedHop;
  user?: User;
};
export function SensoryTab({ src, user }: SensoryTabProps) {
  return (
    <div className="">
      <HopSensory
        hop={src}
        user={user}
        //userPanels={userPanels}
        //expertPanels={expertPanels}
      />
      <Button asChild>
        <Link href={`/admin/sensory/hops/${src.slug}`}>User</Link>
      </Button>
    </div>
  );
}

export default SensoryTab;

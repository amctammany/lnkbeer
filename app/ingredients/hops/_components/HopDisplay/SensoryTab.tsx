import { ExtendedHop } from "@/types/ingredient";
import { HopSensory } from "../HopSensory";
//import { HopSensoryChart } from "../HopSensoryChart";

export type SensoryTabProps = {
  src: ExtendedHop;
};
export function SensoryTab({ src }: SensoryTabProps) {
  const user = { id: "foo" };
  const expertPanels = (src.hopSensoryPanels ?? []).filter(
    (panel) => panel.userId === "ADMIN"
  );
  const userPanels = (src.hopSensoryPanels ?? []).filter(
    (panel) => user && panel.userId === user.id
  );

  return (
    <div className="">
      <HopSensory
        hop={src}
        userPanels={userPanels}
        expertPanels={expertPanels}
      />
    </div>
  );
}

export default SensoryTab;

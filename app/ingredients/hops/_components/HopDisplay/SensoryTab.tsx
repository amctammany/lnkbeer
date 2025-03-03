import { ExtendedHop } from "@/types/ingredient";
import { HopSensoryChart } from "../HopSensoryChart";

export type SensoryTabProps = {
  src: ExtendedHop;
};
export function SensoryTab({ src }: SensoryTabProps) {
  console.log(src);
  return (
    <div className="">
      <HopSensoryChart src={src} />
    </div>
  );
}

export default SensoryTab;

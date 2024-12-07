import { getWaterProfiles } from "@/app/profiles/water/queries";
import WaterProfilesTable from "./_components/WaterProfilesTable/WaterProfilesTable";
export const metadata = {
  title: "LNK: WaterProfiles",
};

export default async function WaterProfilesListPage() {
  const waterProfiles = await getWaterProfiles();
  return <WaterProfilesTable waterProfiles={waterProfiles} />;
}

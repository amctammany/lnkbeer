import { getMashProfiles } from "@/app/profiles/mash/queries";
import MashProfilesTable from "./_components/MashProfilesTable/MashProfilesTable";
export const metadata = {
  title: "LNK: MashProfiles",
};

export default async function MashProfilesListPage() {
  const mashProfiles = await getMashProfiles();
  return <MashProfilesTable mashProfiles={mashProfiles} />;
}

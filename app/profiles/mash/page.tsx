import { getMashProfiles } from "@/app/profiles/mash/queries";
import MashProfilesTable from "./_components/MashProfilesTable/MashProfilesTable";
import { AppBarLayout } from "@/components/AppBarLayout";
import { MashProfilesTableActions } from "./_components/MashProfilesTable/MashProfilesTableActions";
export const metadata = {
  title: "LNK: MashProfiles",
};
export default async function MashProfilesListPage() {
  const mashProfiles = await getMashProfiles();
  return (
    <AppBarLayout title="Mash Profiles" actions={<MashProfilesTableActions />}>
      <MashProfilesTable mashProfiles={mashProfiles} />
    </AppBarLayout>
  );
}

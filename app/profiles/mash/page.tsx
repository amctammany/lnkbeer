import { getMashProfiles } from "@/app/profiles/mash/queries";
import MashProfilesTable from "./_components/MashProfilesTable/MashProfilesTable";
import { AppBarLayout } from "@/components/AppBarLayout";
import { AppBarItem } from "@/components/AppBarItem";
import { PlusCircle } from "lucide-react";
export const metadata = {
  title: "LNK: MashProfiles",
};
const MashProfilesListActions = () => {
  return [
    <AppBarItem
      key="new"
      text="new"
      icon={<PlusCircle />}
      url="/profiles/mash/new"
    />,
  ];
};
export default async function MashProfilesListPage() {
  const mashProfiles = await getMashProfiles();
  return (
    <AppBarLayout title="Mash Profiles" actions={<MashProfilesListActions />}>
      <MashProfilesTable mashProfiles={mashProfiles} />
    </AppBarLayout>
  );
}

import { getMashProfiles } from "@/app/profiles/mash/queries";
import MashProfilesTable from "./_components/MashProfilesTable/MashProfilesTable";
import { AppBarLayout } from "@/components/AppBarLayout";
import { AppBarAction, AppBarActionProps } from "@/components/AppBar";
import { PlusCircle } from "lucide-react";
export const metadata = {
  title: "LNK: MashProfiles",
};
const actions: AppBarActionProps[] = [
  { text: "New", icon: PlusCircle, url: "/profiles/mash/new" },
];
const MashProfilesListActions = () => {
  return [
    <AppBarAction
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

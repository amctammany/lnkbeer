import { getMashProfiles } from "@/app/profiles/mash/queries";
import MashProfilesTable from "./_components/MashProfilesTable/MashProfilesTable";
import { AppBarLayout } from "@/components/AppBarLayout";
import { AppBarAction } from "@/components/AppBar";
import { PlusCircle } from "lucide-react";
export const metadata = {
  title: "LNK: MashProfiles",
};
const actions: AppBarAction[] = [
  { text: "New", icon: PlusCircle, url: "/profiles/mash/new" },
];
export default async function MashProfilesListPage() {
  const mashProfiles = await getMashProfiles();
  return (
    <AppBarLayout title="Mash Profiles" actions={actions}>
      <MashProfilesTable mashProfiles={mashProfiles} />
    </AppBarLayout>
  );
}

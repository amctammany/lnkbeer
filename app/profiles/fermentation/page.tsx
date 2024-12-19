import { getFermentationProfiles } from "@/app/profiles/fermentation/queries";
import { FermentationProfilesTable } from "@/app/profiles/fermentation/_components/FermentationProfilesTable";
import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { ChartLine } from "lucide-react";
import FermentationProfilesTableActions from "./_components/FermentationProfilesTable/FermentationProfilesTableActions";
export const metadata = {
  title: "LNK: FermentationProfiles",
};

export default async function FermentationProfilesListPage() {
  const fermentationProfiles = await getFermentationProfiles();
  return (
    <AppBarLayout
      title={
        <AppBarTitle icon={<ChartLine />}>Fermentation Profiles</AppBarTitle>
      }
      actions={<FermentationProfilesTableActions />}
    >
      <FermentationProfilesTable src={fermentationProfiles} />;
    </AppBarLayout>
  );
}

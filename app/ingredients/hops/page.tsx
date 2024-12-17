import { AppBarLayout } from "@/components/AppBarLayout";
import { HopsTableActions } from "@/app/ingredients/hops/_components/HopsTable/HopsTableActions";
import { AppBarTitle } from "@/components/AppBarTitle";
import { Hop } from "lucide-react";
import { HopsTableContainer } from "./HopsTableContainer";
export const metadata = {
  title: "LNK: Hops",
};

export default async function HopsListPage() {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Hop />}>Hops</AppBarTitle>}
      actions={<HopsTableActions />}
    >
      <HopsTableContainer />;
    </AppBarLayout>
  );
}

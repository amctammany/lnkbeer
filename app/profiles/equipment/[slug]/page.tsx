import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Anvil } from "lucide-react";
//import { EquipmentProfileDisplay } from "../_components/EquipmentProfileDisplay";
import EquipmentProfileDisplayActions from "../_components/EquipmentProfileDisplay/EquipmentProfileDisplayActions";
import { getEquipmentProfile } from "../queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
const Display = dynamic(
  () => import("../_components/EquipmentProfileDisplay/EquipmentProfileDisplay")
);
const Table = dynamic(
  () => import("../_components/EquipmentProfilesTable/EquipmentProfilesTable")
);
type EquipmentProfileDisplayPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: EquipmentProfileDisplayPageProps) {
  const { slug } = await params;
  return {
    title: `LNK EquipmentProfile: ${slug}`,
  };
}

export default async function EquipmentProfileDisplayPage({
  params,
}: EquipmentProfileDisplayPageProps) {
  const { slug } = await params;
  const equipmentProfile = await getEquipmentProfile(slug);
  return (
    <AppBarLayout
      title={
        <AppBarTitle icon={<Anvil />}>{equipmentProfile?.name}</AppBarTitle>
      }
      actions={<EquipmentProfileDisplayActions src={equipmentProfile} />}
    >
      <Tabs defaultValue="summary">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <Display src={equipmentProfile} />
        </TabsContent>
        <TabsContent value="analytics">
          <Table
            equipmentProfiles={[] as any}
            //action={updateEquipmentProfile}
          />
        </TabsContent>
      </Tabs>
    </AppBarLayout>
  );
}

import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Thermometer } from "lucide-react";
import { MashProfileDisplay } from "../_components/MashProfileDisplay";
import MashProfileDisplayActions from "../_components/MashProfileDisplay/MashProfileDisplayActions";
import { getMashProfile } from "../queries";
type MashProfileDisplayPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: MashProfileDisplayPageProps) {
  const { slug } = await params;
  return {
    title: `LNK MashProfile: ${slug}`,
  };
}

export default async function MashProfileDisplayPage({
  params,
}: MashProfileDisplayPageProps) {
  const { slug } = await params;
  const mashProfile = await getMashProfile(slug);
  return (
    <AppBarLayout
      title={
        <AppBarTitle icon={<Thermometer />}>{mashProfile?.name}</AppBarTitle>
      }
      actions={<MashProfileDisplayActions src={mashProfile} />}
    >
      <MashProfileDisplay src={mashProfile} />
    </AppBarLayout>
  );
}

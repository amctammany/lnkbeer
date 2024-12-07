import { MashProfileForm } from "@/app/profiles/mash/_components/MashProfileForm";
import { getMashProfile } from "@/app/profiles/mash/queries";
import { updateMashProfile } from "@/app/profiles/mash/actions";
type MashProfileCreatorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: MashProfileCreatorPageProps) {
  const { slug } = await params;
  return {
    title: `LNK MashProfile: ${slug}`,
  };
}

export default async function MashProfileCreatorPage({
  params,
}: MashProfileCreatorPageProps) {
  const { slug } = await params;
  const mashProfile = await getMashProfile(slug);
  return <MashProfileForm src={mashProfile} action={updateMashProfile} />;
}

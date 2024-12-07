import { MashProfileForm } from "@/app/profiles/mash/_components/MashProfileForm";
import { getMashProfile } from "@/app/profiles/mash/queries";
import { updateMashProfile } from "../../actions";
type MashProfileEditorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: MashProfileEditorPageProps) {
  const { slug } = await params;
  return {
    title: `LNK MashProfile: ${slug}`,
  };
}

export default async function MashProfileEditorPage({
  params,
}: MashProfileEditorPageProps) {
  const { slug } = await params;
  const mashProfile = await getMashProfile(slug);
  return (
    <MashProfileForm
      src={mashProfile}
      action={updateMashProfile}
    />
  );
}

import { MashProfileForm } from "../../_components/MashProfileForm";
import { updateMashProfile } from "../../actions";
import { getMashProfile } from "../../queries";

export type MashProfileForkPageProps = {
  params: Promise<{ slug: string }>;
};
export default async function MashProfileForkPage({
  params,
}: MashProfileForkPageProps) {
  const { slug } = await params;
  const old = await getMashProfile(slug);
  const fork = { ...old, forkedFrom: old.id };

  return <MashProfileForm src={fork} action={updateMashProfile} />;
}

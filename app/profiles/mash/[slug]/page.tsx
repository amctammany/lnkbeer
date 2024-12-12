import { MashProfileDisplay } from "../_components/MashProfileDisplay";
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
  return <MashProfileDisplay src={mashProfile} />;
}

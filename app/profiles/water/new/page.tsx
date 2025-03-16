import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { WaterProfileInput } from "@/types/Profile";
import { createWaterProfile } from "../actions";
import { WaterProfileForm } from "../_components/WaterProfileForm";
type WaterProfileCreatorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: WaterProfileCreatorPageProps) {
  const { slug } = await params;
  return {
    title: `LNK WaterProfile: ${slug}`,
  };
}

export default async function WaterProfileCreatorPage({}: WaterProfileCreatorPageProps) {
  const session = await auth();
  if (!session?.user)
    return redirect("/admin/login?returnUrl=/profiles/water/new");
  const src = {
    userId: session.user.id,
    calcium: 0,
    magnesium: 0,
    chloride: 0,
    sodium: 0,
    bicarbonate: 0,
    sulfate: 0,
  } as WaterProfileInput;
  return <WaterProfileForm src={src} action={createWaterProfile} />;
  //redirect(`/profiles/water/${res.slug}/edit`);
}

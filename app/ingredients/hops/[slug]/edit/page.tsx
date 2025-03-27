import { HopEditor } from "@/app/ingredients/hops/_components/HopEditor";
import { getHop } from "@/app/ingredients/hops/queries";
import { updateHop } from "@/app/ingredients/hops/actions";
import { HopUsage } from "@prisma/client";
import { notFound } from "next/navigation";
interface HopEditorPageProps {
  params: Promise<{
    slug: string;
  }>;
}
export async function generateMetadata({ params }: HopEditorPageProps) {
  const { slug } = await params;
  return {
    title: `LNK Hop: ${slug}`,
  };
}

export default async function HopEditorPage({ params }: HopEditorPageProps) {
  const { slug } = await params;
  const hop = await getHop(slug);
  if (!hop) notFound();
  return <HopEditor hop={hop} action={updateHop} usage={HopUsage} />;
}

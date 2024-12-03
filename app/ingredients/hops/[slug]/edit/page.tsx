import { HopEditor } from "@/app/ingredients/hops/_components/HopEditor";
import { getHop } from "@/app/ingredients/hops/queries";
import { updateHop } from "@/app/ingredients/hops/actions";
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
  return <HopEditor hop={hop} action={updateHop} />;
}

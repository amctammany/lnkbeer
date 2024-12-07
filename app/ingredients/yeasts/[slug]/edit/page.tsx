import { YeastEditor } from "@/app/ingredients/yeasts/_components/YeastEditor";
import { getYeast } from "@/app/ingredients/yeasts/queries";
import { updateYeast } from "../../actions";
type YeastEditorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: YeastEditorPageProps) {
  const { slug } = await params;
  return {
    title: `LNK Yeast: ${slug}`,
  };
}

export default async function YeastEditorPage({
  params,
}: YeastEditorPageProps) {
  const { slug } = await params;
  const yeast = await getYeast(slug);
  return <YeastEditor src={yeast} action={updateYeast} />;
}

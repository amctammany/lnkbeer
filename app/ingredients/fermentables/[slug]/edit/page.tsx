import { FermentableEditor } from "@/app/ingredients/fermentables/_components/FermentableEditor";
import { getFermentable } from "@/app/ingredients/fermentables/queries";
import { updateFermentable } from "../../actions";
type FermentableEditorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: FermentableEditorPageProps) {
  const { slug } = await params;
  return {
    title: `LNK Fermentable: ${slug}`,
  };
}

export default async function FermentableEditorPage({
  params,
}: FermentableEditorPageProps) {
  const { slug } = await params;
  const fermentable = await getFermentable(slug);
  return <FermentableEditor src={fermentable} action={updateFermentable} />;
}

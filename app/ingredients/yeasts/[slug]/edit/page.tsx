import { YeastEditor } from "@/app/ingredients/yeasts/_components/YeastEditor";
import { getYeast } from "@/app/ingredients/yeasts/queries";
import { updateYeast } from "../../actions";
import { authorizeResource } from "@/lib/authorizeResource";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/app/auth";
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
  const session = await auth();
  if (!session?.user)
    return redirect("/admin/login?callbackUrl=/ingredients/yeasts/new");
  const { slug } = await params;
  const res = await authorizeResource(getYeast, slug);
  const yeast = { ...res, userId: session.user.id };
  if (!res) notFound();
  return <YeastEditor yeast={yeast} action={updateYeast} />;
}

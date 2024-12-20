import { YeastEditor } from "@/app/ingredients/yeasts/_components/YeastEditor";
import { getYeast } from "@/app/ingredients/yeasts/queries";
import { updateYeast } from "../../actions";
import { auth } from "@/app/auth";
import { forbidden, unauthorized } from "next/navigation";
import { authorizeUser } from "@/lib/authorizeUser";
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
  if (!session?.user) return unauthorized();
  if (session?.role !== "SUPERUSER") return forbidden();
  const { slug } = await params;
  const yeast = await getYeast(slug);
  const res = await authorizeUser(yeast!, session.user);
  return <YeastEditor src={yeast} action={updateYeast} />;
}

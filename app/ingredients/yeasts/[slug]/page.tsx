import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { FlaskConical } from "lucide-react";
import { YeastDisplay } from "../_components/YeastDisplay";
import { YeastDisplayActions } from "../_components/YeastDisplay/YeastDisplayActions";
import { getYeast, getYeasts } from "../queries";
import { notFound } from "next/navigation";
type YeastDisplayPageProps = {
  params: Promise<{
    slug: string;
  }>;
};
export async function generateStaticParams() {
  const yeasts = await getYeasts();

  return yeasts.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: YeastDisplayPageProps) {
  const { slug } = await params;
  return {
    title: `LNK Yeast: ${slug}`,
  };
}

export default async function YeastDisplayPage({
  params,
}: YeastDisplayPageProps) {
  const { slug } = await params;
  const yeast = await getYeast(slug);
  if (!yeast) notFound();
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<FlaskConical />}>{yeast?.name}</AppBarTitle>}
      actions={<YeastDisplayActions slug={slug} />}
    >
      <YeastDisplay src={yeast} />
    </AppBarLayout>
  );
}

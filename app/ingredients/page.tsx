import { AppBarLayout } from "@/components/AppBarLayout";

export const metadata = {
  title: "LNK: Hops",
};

export default async function IngredientsPage() {
  return (
    <AppBarLayout title="Ingredients">
      <div>Hops</div>
      <div>Fermentables</div>
      <div>Yeasts</div>
    </AppBarLayout>
  );
}

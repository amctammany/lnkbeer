import { AppBarLayout } from "@/components/AppBarLayout";
import { Separator } from "@/components/ui/separator";
export const metadata = {
  title: "LNK",
};
export default function Home() {
  return (
    <AppBarLayout title="Home">
      Home!
      <Separator className="text-black bg-black w-2" orientation="vertical" />
    </AppBarLayout>
  );
}

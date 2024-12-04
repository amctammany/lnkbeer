import { AppBarLayout } from "@/components/AppBarLayout";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <AppBarLayout title="Home">
      Home!
      <Separator className="text-black bg-black w-2" orientation="vertical" />
    </AppBarLayout>
  );
}

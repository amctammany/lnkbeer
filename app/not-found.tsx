import { AppBarLayout } from "@/components/AppBarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <AppBarLayout title="Not Found">
      <div className="p-12">
        <Card className="bg-slate-200 w-9/12  h-fit m-auto">
          <CardHeader>
            <CardTitle>Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Could not find requested resource</p>
          </CardContent>
        </Card>
      </div>
    </AppBarLayout>
  );
}

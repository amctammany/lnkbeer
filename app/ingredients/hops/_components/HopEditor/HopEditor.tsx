import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Hop } from "@prisma/client";
import { Save } from "lucide-react";

export type HopEditorProps = {
  hop?: Hop | null;
  action: any;
};
const makeActions: (hop: Hop) => AppBarAction[] = (hop) => [
  { text: "Save", icon: Save },
];
export function HopEditor({ hop, action }: HopEditorProps) {
  return (
    <form className="flex" action={action}>
      <AppBarLayout
        title={`Hop Editor: ${hop?.name}`}
        actions={[{ text: "Save", icon: Save, type: "submit" }]}
      >
        <div className="">
          {Object.entries(hop || {}).map(([key, value]) => (
            <div key={key} className="flex border-2 mb-1">
              <span className="bg-slate-200 px-2">{key}</span>
              <span className="flex-grow px-2">{value}</span>
            </div>
          ))}
        </div>
      </AppBarLayout>
    </form>
  );
}

export default HopEditor;

import { auth } from "@/app/auth";
import { Prop } from "@/components/Prop";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/client";
import { Hop, HopNote } from "@prisma/client";
import { redirect } from "next/navigation";
import NotesTabForm from "./NotesTabForm";
import { createHopNote, updateHopNote } from "../../actions";

export type NotesTabProps = {
  src: Hop;
};
export async function NotesTab({ src }: NotesTabProps) {
  const session = await auth();

  if (!session || !session?.user?.email) return redirect("/");
  const hopNote =
    (await prisma.hopNote.findFirst({
      where: { userEmail: session?.user?.email, hopId: src?.id },
      include: { hop: true, sensoryPanel: { include: { aromas: true } } },
    })) ||
    ({
      userEmail: session?.user?.email,
      hopId: src?.id,
      hop: { slug: src.slug },
    } as any);
  const aromas = await prisma.characteristicAroma.findMany();
  return (
    <div className="">
      <Card className="m-4 *:border-b-2 *:last-of-type:border-b-0 ">
        <h4>Notes</h4>
        <Prop label="Name" value={src.name} />
        <NotesTabForm
          action={hopNote?.uid ? updateHopNote : createHopNote}
          src={hopNote}
          aromas={aromas}
        />
      </Card>
    </div>
  );
}

export default NotesTab;

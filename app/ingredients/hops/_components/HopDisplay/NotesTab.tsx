import { auth } from "@/app/auth";
import { Prop } from "@/components/Prop";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/client";
import { Hop } from "@prisma/client";
import { redirect } from "next/navigation";

export type NotesTabProps = {
  src: Hop;
};
export async function NotesTab({ src }: NotesTabProps) {
  const session = await auth();

  if (!session || !session?.user?.email) return redirect("/");
  const hopNote = await prisma.hopNote.findFirst({
    where: { userEmail: session?.user?.email, hopId: src?.id },
  });
  console.log(hopNote);

  return (
    <div className="">
      <Card className="m-4 *:border-b-2 *:last-of-type:border-b-0 ">
        <h4>Notes</h4>
        <Prop label="Name" value={src.name} />
      </Card>
    </div>
  );
}

export default NotesTab;

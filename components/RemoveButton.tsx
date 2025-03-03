import { Trash } from "lucide-react";
import { Button } from "./ui/button";

export type RemoveButtonProps = {
  id?: number | string;
  action?: any;
  name?: string;
};
export const RemoveButton = ({
  id,
  name = "id",
  action,
}: RemoveButtonProps) => {
  return (
    <form action={action}>
      <input type="hidden" name={name} value={id} />
      <Button
        variant="destructive"
        type="submit"
        size="sm"
        className="w-full grow"
        //className="border-red-300 border hover:text-red-300  hover:bg-white bg-red-300 text-white rounded-md p-2"
      >
        <Trash />
        <span>Remove</span>
      </Button>
    </form>
  );
};

import { Trash } from "lucide-react";

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
      <button
        type="submit"
        className="border-red-300 border hover:text-red-300  hover:bg-white bg-red-300 text-white rounded-md p-2"
      >
        <Trash className="h-5 w-5 " />
      </button>
    </form>
  );
};

import { AppBarItem } from "@/components/AppBarItem";
import { ExtendedMashProfile } from "@/types/Profile";
import { Edit, ForkKnife } from "lucide-react";

export type MashProfileDisplayProps = {
  src?: ExtendedMashProfile | null;
};
const MashProfileDisplayActions = ({
  src,
}: {
  src?: ExtendedMashProfile | null;
}) => {
  return [
    <AppBarItem
      key="edit"
      text="Edit"
      icon={<Edit />}
      url={`/profiles/mash/${src?.slug}/edit`}
    />,
    <AppBarItem
      key="fork"
      text="Fork"
      icon={<ForkKnife />}
      url={`/profiles/mash/${src?.slug}/fork`}
    />,
  ];
};

export default MashProfileDisplayActions;

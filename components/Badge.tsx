import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export type BadgeProps = {
  label?: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
};
export const Badge = ({ label, icon, value, children }: BadgeProps) => {
  return (
    <div className="flex h-6">
      <div className="grid border border-black border-r-0 bg-blue-500 text-white px-2 rounded-l-md [&>svg]:size-4 [&>svg]:my-auto [&>svg]:shrink-0">
        {icon ?? label}
      </div>
      <span className="border border-black border-l-0 bg-white px-4 rounded-r-md">
        {children ?? value}
      </span>
    </div>
  );
};

export const TooltipBadge = (props: BadgeProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge {...props} />
        </TooltipTrigger>
        <TooltipContent>{props.label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

import clsx from "clsx";

export type IconBadgeProps = {
  icon: React.ReactNode;
  label?: string;
  text?: string;
  className?: string;
};
export function IconBadge({ icon, label, text, className }: IconBadgeProps) {
  return (
    <div
      className={clsx(
        "flex items-center place-content-center border rounded border-black",
        className
      )}
    >
      {icon}
      <span className={label ? "hidden lg:block pr-2 font-bold" : "hidden"}>
        {label}
      </span>
      <span className="border-l-2 border-black px-1 lg:px-3">{text}</span>
    </div>
  );
}
export default IconBadge;

export type BadgeProps = {
  label: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
};
export const Badge = ({ label, value, children }: BadgeProps) => {
  return (
    <div className="flex ">
      <span className="border border-black border-r-0 bg-blue-500 text-white px-2 rounded-l-md">
        {label}
      </span>
      <span className="border border-black border-l-0 bg-white px-4 rounded-r-md">
        {children ?? value}
      </span>
    </div>
  );
};

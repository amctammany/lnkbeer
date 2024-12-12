export type PropProps = {
  label: string | React.ReactNode;
  value?: string | number | null | React.ReactNode;
  unit?: string | React.ReactNode;
};
export const Prop = ({ label, value, unit }: PropProps) => {
  return (
    <div className="flex align-text-bottom  py-2">
      <span className="leading-6 my-auto font-mono font-bold text-gray-700 px-2 flex-shrink ">
        {label}:
      </span>
      <span className="my-auto leading-6 font-mono flex-grow">
        {value}
        <span className="pl-1">{unit}</span>
      </span>
    </div>
  );
};

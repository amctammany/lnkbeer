export type PropProps = {
  label: string;
  value?: string | number | null;
};
export const Prop = ({ label, value }: PropProps) => {
  return (
    <div className="flex align-text-bottom ">
      <span className="leading-6 my-auto font-mono font-bold text-gray-700 px-2 flex-shrink ">
        {label}:
      </span>
      <span className="my-auto leading-6 font-mono flex-grow">{value}</span>
    </div>
  );
};

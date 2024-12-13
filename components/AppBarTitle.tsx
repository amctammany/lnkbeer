export type AppBarTitleProps = {
  icon?: any;
  children?: React.ReactNode | React.ReactNode[];
};
export function AppBarTitle({ children, icon }: AppBarTitleProps) {
  const body =
    typeof children === "string" ? (
      <span className="flex-grow truncate">{children}</span>
    ) : (
      children
    );
  return (
    <div className="flex-grow inline-flex text-sm [&_svg]:size-4 lg:[&_svg]:size-6 lg:text-lg [&_svg]:shrink-0 items-center justify-start gap-2 truncate">
      {icon}
      {body}
    </div>
  );
}

export default AppBarTitle;

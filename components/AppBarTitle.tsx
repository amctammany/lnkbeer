export type AppBarTitleProps = {
  icon?: any;
  children?: React.ReactNode | React.ReactNode[];
};
export function AppBarTitle({ children, icon }: AppBarTitleProps) {
  const body =
    typeof children === "string" ? (
      <span className="grow truncate">{children}</span>
    ) : (
      children
    );
  return (
    <div className="grow font-bold inline-flex text-sm [&>svg]:size-4 lg:[&>svg]:size-6 lg:text-md [&>svg]:shrink-0 items-center justify-start gap-2 truncate">
      {icon}
      {body}
    </div>
  );
}

export default AppBarTitle;

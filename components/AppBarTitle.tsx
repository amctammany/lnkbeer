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
    <div className="flex-grow inline-flex [&_svg]:size-5 text-lg [&_svg]:shrink-0 items-center justify-start gap-2 truncate">
      {icon}
      {body}
    </div>
  );
}

export default AppBarTitle;

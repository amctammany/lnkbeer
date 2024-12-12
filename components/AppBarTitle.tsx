export type AppBarTitleProps = {
  icon?: any;
  children?: React.ReactNode | React.ReactNode[];
};
export function AppBarTitle({ children, icon }: AppBarTitleProps) {
  console.log(typeof children);
  const body =
    typeof children === "string" ? (
      <span className="truncate">{children}</span>
    ) : (
      children
    );
  return (
    <div className="inline-flex [&_svg]:size-5 text-lg [&_svg]:shrink-0 items-center justify-start gap-2 truncate">
      {icon}
      {body}
    </div>
  );
}

export default AppBarTitle;

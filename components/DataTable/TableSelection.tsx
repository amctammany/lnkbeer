export function TableSelection({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex-1 text-sm text-muted-foreground">
      <div>{children}</div>
    </div>
  );
}

export default TableSelection;

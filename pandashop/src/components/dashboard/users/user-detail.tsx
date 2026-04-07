interface UserDetailProps {
  label: string;
  value?: string;
}

export function UserDetail({ label, value }: UserDetailProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">
        {value || "—"}
      </span>
    </div>
  );
}

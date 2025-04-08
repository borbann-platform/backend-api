import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: "active" | "paused" | "error" }) {
  if (status === "active") {
    return (
      <Badge
        variant="default"
        className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
      >
        Active
      </Badge>
    );
  } else if (status === "paused") {
    return <Badge variant="secondary">Paused</Badge>;
  } else {
    return <Badge variant="destructive">Error</Badge>;
  }
}

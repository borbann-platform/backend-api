import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function PipelineStatus() {
  return (
    <Card className="border-2 border-green-500 dark:border-green-600">
      <CardHeader>
        <CardTitle className="text-lg">Pipeline Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status:</span>
            <Badge
              variant="default"
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Active
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Last Run:</span>
            <span>2 hours ago</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Next Run:</span>
            <span>Tomorrow at 9:00 AM</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Run Frequency:</span>
            <span>Daily</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Records:</span>
            <span>1,240</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

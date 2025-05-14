import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

export function PipelineRunHistory() {
  return (
    <Card className="border-2 hover:border-highlight-border transition-all duration-200">
      <CardHeader>
        <CardTitle>Run History</CardTitle>
        <CardDescription>History of pipeline executions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Run ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Duration
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Records
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 text-sm">RUN-123</td>
                  <td className="px-4 py-2 text-sm">Today, 10:30 AM</td>
                  <td className="px-4 py-2 text-sm">
                    <Badge
                      variant="default"
                      className="bg-success hover:bg-success"
                    >
                      Success
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-sm">2m 15s</td>
                  <td className="px-4 py-2 text-sm">1,240</td>
                  <td className="px-4 py-2 text-sm">
                    <Button variant="outline" size="sm">
                      View Log
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm">RUN-122</td>
                  <td className="px-4 py-2 text-sm">Yesterday, 10:30 AM</td>
                  <td className="px-4 py-2 text-sm">
                    <Badge
                      variant="default"
                      className="bg-success hover:bg-success"
                    >
                      Success
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-sm">2m 10s</td>
                  <td className="px-4 py-2 text-sm">1,235</td>
                  <td className="px-4 py-2 text-sm">
                    <Button variant="outline" size="sm">
                      View Log
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm">RUN-121</td>
                  <td className="px-4 py-2 text-sm">2 days ago, 10:30 AM</td>
                  <td className="px-4 py-2 text-sm">
                    <Badge
                      variant="default"
                      className="bg-success hover:bg-success"
                    >
                      Success
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-sm">2m 05s</td>
                  <td className="px-4 py-2 text-sm">1,228</td>
                  <td className="px-4 py-2 text-sm">
                    <Button variant="outline" size="sm">
                      View Log
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";

export function PipelineSettings() {
  return (
    <Card className="border-2 hover:border-highlight-border transition-all duration-200">
      <CardHeader>
        <CardTitle>Pipeline Settings</CardTitle>
        <CardDescription>Configure pipeline behavior</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Scheduling</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="frequency">Run Frequency</Label>
                <select
                  id="frequency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="daily"
                >
                  <option value="manual">Manual (Run on demand)</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="custom">Custom Schedule</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Run Time</Label>
                <Input id="time" type="time" defaultValue="09:00" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Data Collection</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="max-records">Maximum Records</Label>
                <Input id="max-records" type="number" defaultValue="2000" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retry-attempts">Retry Attempts</Label>
                <Input id="retry-attempts" type="number" defaultValue="3" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Notifications</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="notify-complete"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  defaultChecked
                />
                <Label
                  htmlFor="notify-complete"
                  className="text-sm font-normal"
                >
                  Notify when pipeline completes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="notify-error"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  defaultChecked
                />
                <Label htmlFor="notify-error" className="text-sm font-normal">
                  Notify on errors
                </Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Save Settings</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

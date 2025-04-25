import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ScheduleAndInformation() {
  return (
    <Card className="mt-6 border-0 hover:border-highlight-border transition-all duration-200">
      <CardHeader>
        <CardTitle>Schedule & Automation</CardTitle>
        <CardDescription>
          Configure when and how your pipeline should run
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Run Frequency</Label>
              <select
                id="frequency"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="utc">UTC</option>
                <option value="est">Eastern Time (ET)</option>
                <option value="cst">Central Time (CT)</option>
                <option value="mst">Mountain Time (MT)</option>
                <option value="pst">Pacific Time (PT)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-records">Collection Limits</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="limit-records"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="limit-records"
                      className="text-sm font-normal"
                    >
                      Limit total records
                    </Label>
                    <Input
                      id="max-records"
                      type="number"
                      placeholder="e.g., 1000"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="stop-no-new"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="stop-no-new" className="text-sm font-normal">
                    Stop when no new records found
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notifications">Notifications</Label>
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
                <div className="mt-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email for notifications"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retry-settings">Retry Settings</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="retry-attempts"
                    className="text-sm font-normal"
                  >
                    Retry Attempts
                  </Label>
                  <Input
                    id="retry-attempts"
                    type="number"
                    placeholder="e.g., 3"
                    defaultValue="3"
                    className="w-24"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="retry-delay" className="text-sm font-normal">
                    Delay Between Retries (minutes)
                  </Label>
                  <Input
                    id="retry-delay"
                    type="number"
                    placeholder="e.g., 5"
                    defaultValue="5"
                    className="w-24"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Globe,
  FileUp,
  DatabaseIcon,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PipelineDetails } from "@/components/pipeline/details";
import { PipelineAiAssistant } from "@/components/pipeline/ai-assistant";

export default function CreatePipelinePage() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Create Data Pipeline"
        description="Set up a new automated data collection pipeline"
        breadcrumb={[
          { title: "Home", href: "/" },
          { title: "Data Pipeline", href: "/data-pipeline" },
          { title: "Create", href: "/data-pipeline/create" },
        ]}
      />

      <div className="mt-6">
        <Link href="/data-pipeline">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pipelines
          </Button>
        </Link>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <PipelineDetails />
            <PipelineAiAssistant />
          </div>

          <div>
            <Card className="border-2 hover:border-highlight-border transition-all duration-200">
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
                <CardDescription>
                  Add one or more data sources to your pipeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="source-1"
                >
                  <AccordionItem
                    value="source-1"
                    className="border rounded-md mb-4 data-source-card active"
                  >
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-5 w-5 text-primary" />
                        <span>Website Source #1</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="url-1">Website URL</Label>
                          <Input
                            id="url-1"
                            placeholder="https://example.com/listings"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="additional-urls-1">
                              Additional URLs (optional)
                            </Label>
                            <Badge variant="outline" className="text-xs">
                              Pattern Detection
                            </Badge>
                          </div>
                          <Textarea
                            id="additional-urls-1"
                            placeholder="https://example.com/listings/page2&#10;https://example.com/listings/page3"
                            rows={3}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Add multiple URLs from the same website (one per
                            line)
                          </p>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Source
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="source-2"
                    className="border rounded-md mb-4 data-source-card"
                  >
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center">
                        <FileUp className="mr-2 h-5 w-5 text-primary" />
                        <span>File Upload Source #1</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="file-upload-1">Upload File</Label>
                          <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">
                                Drag and drop your file here, or click to browse
                              </p>
                              <Button variant="outline" className="mt-2">
                                Select File
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Supported formats: CSV, JSON, Excel, XML (up to
                            50MB)
                          </p>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Source
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="source-3"
                    className="border rounded-md mb-4 data-source-card"
                  >
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center">
                        <DatabaseIcon className="mr-2 h-5 w-5 text-primary" />
                        <span>API Source #1</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="api-url-1">API Endpoint URL</Label>
                          <Input
                            id="api-url-1"
                            placeholder="https://api.example.com/data"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="auth-type-1">
                            Authentication Type
                          </Label>
                          <select
                            id="auth-type-1"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="none">None</option>
                            <option value="basic">Basic Auth</option>
                            <option value="bearer">Bearer Token</option>
                            <option value="api-key">API Key</option>
                          </select>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Source
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex flex-col gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Website Source
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add File Upload Source
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add API Source
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 border-2 hover:border-highlight-border transition-all duration-200">
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
                          <Label
                            htmlFor="stop-no-new"
                            className="text-sm font-normal"
                          >
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
                          <Label
                            htmlFor="notify-error"
                            className="text-sm font-normal"
                          >
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
                          <Label
                            htmlFor="retry-delay"
                            className="text-sm font-normal"
                          >
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
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline">Save as Draft</Button>
          <Button>Create Pipeline</Button>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Edit, Play, Trash, Copy, Check, Plus } from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/page-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PipelineStatus } from "@/components/pipeline/status"

export default function PipelineDetailsPage() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Property Listings Pipeline"
        breadcrumb={[
          { title: "Home", href: "/" },
          { title: "Data Pipeline", href: "/data-pipeline" },
          { title: "Property Listings", href: "/data-pipeline/property-listings" },
        ]}
      />

      <div className="flex justify-between items-center mt-6">
        <Link href="/data-pipeline">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pipelines
          </Button>
        </Link>

        <div className="flex space-x-2">
          <Button variant="outline" className="gap-2 border-primary/20 hover:border-primary">
            <Copy className="h-4 w-4" />
            Clone
          </Button>
          <Button variant="outline" className="gap-2 border-primary/20 hover:border-primary">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" className="gap-2 border-primary/20 hover:border-primary">
            <Play className="h-4 w-4" />
            Run Now
          </Button>
          <Button variant="destructive" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-6">
        <PipelineStatus />

        <Card className="border-2 hover:border-highlight-border transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-lg">Data Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border-2 rounded-md hover:border-highlight-border transition-all duration-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium">example-realty.com</span>
                  <Badge>Website</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Last updated: 2 hours ago</p>
                <p className="text-sm mt-1">540 records</p>
              </div>

              <div className="p-3 border-2 rounded-md hover:border-highlight-border transition-all duration-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium">property-listings.com</span>
                  <Badge>Website</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Last updated: 2 hours ago</p>
                <p className="text-sm mt-1">420 records</p>
              </div>

              <div className="p-3 border-2 rounded-md hover:border-highlight-border transition-all duration-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium">real-estate-api.com</span>
                  <Badge>API</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Last updated: 2 hours ago</p>
                <p className="text-sm mt-1">280 records</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-highlight-border transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-lg">Export Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full" defaultValue="format-1">
                <AccordionItem value="format-1" className="border-0">
                  <div className="border rounded-md p-2 hover:border-highlight-border transition-all duration-200">
                    <AccordionTrigger className="py-1 px-2">
                      <div className="flex items-center">
                        <Download className="mr-2 h-4 w-4 text-primary" />
                        <span>Export as JSON</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-1 px-2">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="pretty-json" className="h-4 w-4" defaultChecked />
                          <label htmlFor="pretty-json" className="text-sm">
                            Pretty print
                          </label>
                        </div>
                        <Button size="sm" className="w-full">
                          Download JSON
                        </Button>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>

                <AccordionItem value="format-2" className="border-0">
                  <div className="border rounded-md p-2 hover:border-highlight-border transition-all duration-200">
                    <AccordionTrigger className="py-1 px-2">
                      <div className="flex items-center">
                        <Download className="mr-2 h-4 w-4 text-primary" />
                        <span>Export as CSV</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-1 px-2">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="include-headers" className="h-4 w-4" defaultChecked />
                          <label htmlFor="include-headers" className="text-sm">
                            Include headers
                          </label>
                        </div>
                        <Button size="sm" className="w-full">
                          Download CSV
                        </Button>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>

                <AccordionItem value="format-3" className="border-0">
                  <div className="border rounded-md p-2 hover:border-highlight-border transition-all duration-200">
                    <AccordionTrigger className="py-1 px-2">
                      <div className="flex items-center">
                        <Download className="mr-2 h-4 w-4 text-primary" />
                        <span>Export as SQLite</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-1 px-2">
                      <Button size="sm" className="w-full">
                        Download SQLite
                      </Button>
                    </AccordionContent>
                  </div>
                </AccordionItem>

                <AccordionItem value="format-4" className="border-0">
                  <div className="border rounded-md p-2 hover:border-highlight-border transition-all duration-200">
                    <AccordionTrigger className="py-1 px-2">
                      <div className="flex items-center">
                        <Download className="mr-2 h-4 w-4 text-primary" />
                        <span>Export as YAML</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-1 px-2">
                      <Button size="sm" className="w-full">
                        Download YAML
                      </Button>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="schema">
          <TabsList>
            <TabsTrigger value="schema">Data Schema</TabsTrigger>
            <TabsTrigger value="preview">Data Preview</TabsTrigger>
            <TabsTrigger value="output">Output Configuration</TabsTrigger>
            <TabsTrigger value="history">Run History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="schema" className="mt-4">
            <Card className="border-2 hover:border-highlight-border transition-all duration-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Data Schema & Field Management</CardTitle>
                    <CardDescription>Customize fields detected from your data sources</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Detected Fields</h3>
                    <Button variant="outline" size="sm">
                      Refresh Detection
                    </Button>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="space-y-3">
                      <div className="field-mapping-item flex items-center">
                        <input type="checkbox" id="field-title" className="h-4 w-4 mr-3" defaultChecked />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Label htmlFor="field-title" className="font-medium">
                              Title
                            </Label>
                            <Badge className="ml-2 bg-green-500 text-white">Auto-detected</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Property title or name</p>
                        </div>
                        <select className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs">
                          <option>String</option>
                          <option>Number</option>
                          <option>Boolean</option>
                          <option>Date</option>
                        </select>
                      </div>

                      <div className="field-mapping-item flex items-center">
                        <input type="checkbox" id="field-price" className="h-4 w-4 mr-3" defaultChecked />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Label htmlFor="field-price" className="font-medium">
                              Price
                            </Label>
                            <Badge className="ml-2 bg-green-500 text-white">Auto-detected</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Property price</p>
                        </div>
                        <select className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs">
                          <option>Number</option>
                          <option>String</option>
                          <option>Boolean</option>
                          <option>Date</option>
                        </select>
                      </div>

                      <div className="field-mapping-item flex items-center">
                        <input type="checkbox" id="field-location" className="h-4 w-4 mr-3" defaultChecked />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Label htmlFor="field-location" className="font-medium">
                              Location
                            </Label>
                            <Badge className="ml-2 bg-green-500 text-white">Auto-detected</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Property location</p>
                        </div>
                        <select className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs">
                          <option>String</option>
                          <option>Number</option>
                          <option>Boolean</option>
                          <option>Date</option>
                        </select>
                      </div>

                      <div className="field-mapping-item flex items-center">
                        <input type="checkbox" id="field-bedrooms" className="h-4 w-4 mr-3" defaultChecked />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Label htmlFor="field-bedrooms" className="font-medium">
                              Bedrooms
                            </Label>
                            <Badge className="ml-2 bg-green-500 text-white">Auto-detected</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Number of bedrooms</p>
                        </div>
                        <select className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs">
                          <option>Number</option>
                          <option>String</option>
                          <option>Boolean</option>
                          <option>Date</option>
                        </select>
                      </div>

                      <div className="field-mapping-item flex items-center">
                        <input type="checkbox" id="field-bathrooms" className="h-4 w-4 mr-3" defaultChecked />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Label htmlFor="field-bathrooms" className="font-medium">
                              Bathrooms
                            </Label>
                            <Badge className="ml-2 bg-green-500 text-white">Auto-detected</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Number of bathrooms</p>
                        </div>
                        <select className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs">
                          <option>Number</option>
                          <option>String</option>
                          <option>Boolean</option>
                          <option>Date</option>
                        </select>
                      </div>

                      <div className="field-mapping-item flex items-center border-dashed">
                        <input type="checkbox" id="field-custom" className="h-4 w-4 mr-3" />
                        <div className="flex-1">
                          <Input placeholder="Add custom field" className="border-none text-sm p-0 h-6" />
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="derived-fields">Derived Fields</Label>
                    <Card className="border border-dashed">
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm">Create calculated fields</CardTitle>
                        <CardDescription>Use formulas to generate new fields from existing data</CardDescription>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="space-y-3">
                          <div className="field-mapping-item">
                            <div className="flex items-center justify-between">
                              <Label className="font-medium">Price Per Square Foot</Label>
                              <Badge variant="outline">Derived</Badge>
                            </div>
                            <div className="flex items-center mt-2">
                              <span className="text-xs text-muted-foreground mr-2">Formula:</span>
                              <code className="text-xs bg-muted/50 p-1 rounded">price / squareFeet</code>
                            </div>
                          </div>

                          <Button variant="outline" size="sm" className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Derived Field
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" className="gap-2 mr-2">
                      Reset to Default
                    </Button>
                    <Button>Save Field Configuration</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="mt-4">
            <Card className="border-2 hover:border-highlight-border transition-all duration-200">
              <CardHeader>
                <CardTitle>Data Preview</CardTitle>
                <CardDescription>Sample of the collected data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Title</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Price</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Bedrooms</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Bathrooms</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Location</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Sq. Ft.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-4 py-2 text-sm">P001</td>
                        <td className="px-4 py-2 text-sm">Modern Apartment</td>
                        <td className="px-4 py-2 text-sm">$350,000</td>
                        <td className="px-4 py-2 text-sm">2</td>
                        <td className="px-4 py-2 text-sm">2</td>
                        <td className="px-4 py-2 text-sm">Downtown</td>
                        <td className="px-4 py-2 text-sm">1,200</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm">P002</td>
                        <td className="px-4 py-2 text-sm">Luxury Villa</td>
                        <td className="px-4 py-2 text-sm">$1,250,000</td>
                        <td className="px-4 py-2 text-sm">5</td>
                        <td className="px-4 py-2 text-sm">4</td>
                        <td className="px-4 py-2 text-sm">Suburbs</td>
                        <td className="px-4 py-2 text-sm">3,500</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm">P003</td>
                        <td className="px-4 py-2 text-sm">Cozy Studio</td>
                        <td className="px-4 py-2 text-sm">$180,000</td>
                        <td className="px-4 py-2 text-sm">1</td>
                        <td className="px-4 py-2 text-sm">1</td>
                        <td className="px-4 py-2 text-sm">City Center</td>
                        <td className="px-4 py-2 text-sm">650</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="output" className="mt-4">
            <Card className="border-2 hover:border-highlight-border transition-all duration-200">
              <CardHeader>
                <CardTitle>Output Configuration</CardTitle>
                <CardDescription>Configure how your data will be structured and exported</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Output Format</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border rounded-md p-3 data-source-card active">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">JSON</span>
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Structured data format</p>
                      </div>
                      <div className="border rounded-md p-3 data-source-card">
                        <span className="font-medium">CSV</span>
                        <p className="text-xs text-muted-foreground mt-1">Spreadsheet compatible</p>
                      </div>
                      <div className="border rounded-md p-3 data-source-card">
                        <span className="font-medium">SQLite</span>
                        <p className="text-xs text-muted-foreground mt-1">Portable database</p>
                      </div>
                      <div className="border rounded-md p-3 data-source-card">
                        <span className="font-medium">YAML</span>
                        <p className="text-xs text-muted-foreground mt-1">Human-readable format</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Format Preview</Label>
                      <Badge variant="outline">Sample Data</Badge>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md overflow-x-auto">
                      <pre className="text-xs">
                        {`{
  "properties": [
    {
      "id": "P001",
      "title": "Modern Apartment",
      "price": 350000,
      "bedrooms": 2,
      "location": "Downtown"
    },
    {
      "id": "P002",
      "title": "Luxury Villa",
      "price": 1250000,
      "bedrooms": 5,
      "location": "Suburbs"
    }
  ]
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="gap-2">
                      <Download className="h-4 w-4" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
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
                          <th className="px-4 py-2 text-left text-sm font-medium">Run ID</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Duration</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Records</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-4 py-2 text-sm">RUN-123</td>
                          <td className="px-4 py-2 text-sm">Today, 10:30 AM</td>
                          <td className="px-4 py-2 text-sm">
                            <Badge variant="default" className="bg-success hover:bg-success">
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
                            <Badge variant="default" className="bg-success hover:bg-success">
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
                            <Badge variant="default" className="bg-success hover:bg-success">
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
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
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
                        <Label htmlFor="notify-complete" className="text-sm font-normal">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


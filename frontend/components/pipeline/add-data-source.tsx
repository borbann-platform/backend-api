import { DatabaseIcon, FileUp, Globe, Plus, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export function AddDataSource() {
  return (
    <Card className="border-0 hover:border-highlight-border transition-all duration-200">
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
                    Add multiple URLs from the same website (one per line)
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
                    Supported formats: CSV, JSON, Excel, XML (up to 50MB)
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
                  <Label htmlFor="auth-type-1">Authentication Type</Label>
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
          <Button variant="outline" className="w-full justify-start gap-2">
            <Plus className="h-4 w-4" />
            Add Website Source
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Plus className="h-4 w-4" />
            Add File Upload Source
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Plus className="h-4 w-4" />
            Add API Source
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

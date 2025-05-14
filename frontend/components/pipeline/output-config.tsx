import { Check, Download } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

export function PipelineOutputConfig() {
  return (
    <Card className="border-2 hover:border-highlight-border transition-all duration-200">
      <CardHeader>
        <CardTitle>Output Configuration</CardTitle>
        <CardDescription>
          Configure how your data will be structured and exported
        </CardDescription>
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
                <p className="text-xs text-muted-foreground mt-1">
                  Structured data format
                </p>
              </div>
              <div className="border rounded-md p-3 data-source-card">
                <span className="font-medium">CSV</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Spreadsheet compatible
                </p>
              </div>
              <div className="border rounded-md p-3 data-source-card">
                <span className="font-medium">SQLite</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Portable database
                </p>
              </div>
              <div className="border rounded-md p-3 data-source-card">
                <span className="font-medium">YAML</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Human-readable format
                </p>
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
  );
}

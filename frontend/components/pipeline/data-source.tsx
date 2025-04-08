import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function PipelineDataSource() {
  return (
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
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: 2 hours ago
            </p>
            <p className="text-sm mt-1">540 records</p>
          </div>

          <div className="p-3 border-2 rounded-md hover:border-highlight-border transition-all duration-200">
            <div className="flex justify-between items-center">
              <span className="font-medium">property-listings.com</span>
              <Badge>Website</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: 2 hours ago
            </p>
            <p className="text-sm mt-1">420 records</p>
          </div>

          <div className="p-3 border-2 rounded-md hover:border-highlight-border transition-all duration-200">
            <div className="flex justify-between items-center">
              <span className="font-medium">real-estate-api.com</span>
              <Badge>API</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: 2 hours ago
            </p>
            <p className="text-sm mt-1">280 records</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Plus } from "lucide-react";
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
import { Badge } from "../ui/badge";

export function PipelineDataSchema() {
  return (
    <Card className="border-2 hover:border-highlight-border transition-all duration-200">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Data Schema & Field Management</CardTitle>
            <CardDescription>
              Customize fields detected from your data sources
            </CardDescription>
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
                <input
                  type="checkbox"
                  id="field-title"
                  className="h-4 w-4 mr-3"
                  defaultChecked
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <Label htmlFor="field-title" className="font-medium">
                      Title
                    </Label>
                    <Badge className="ml-2 bg-green-500 text-white">
                      Auto-detected
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Property title or name
                  </p>
                </div>
                <select className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs">
                  <option>String</option>
                  <option>Number</option>
                  <option>Boolean</option>
                  <option>Date</option>
                </select>
              </div>

              <div className="field-mapping-item flex items-center">
                <input
                  type="checkbox"
                  id="field-price"
                  className="h-4 w-4 mr-3"
                  defaultChecked
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <Label htmlFor="field-price" className="font-medium">
                      Price
                    </Label>
                    <Badge className="ml-2 bg-green-500 text-white">
                      Auto-detected
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Property price
                  </p>
                </div>
                <select className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs">
                  <option>Number</option>
                  <option>String</option>
                  <option>Boolean</option>
                  <option>Date</option>
                </select>
              </div>

              <div className="field-mapping-item flex items-center">
                <input
                  type="checkbox"
                  id="field-location"
                  className="h-4 w-4 mr-3"
                  defaultChecked
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <Label htmlFor="field-location" className="font-medium">
                      Location
                    </Label>
                    <Badge className="ml-2 bg-green-500 text-white">
                      Auto-detected
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Property location
                  </p>
                </div>
                <select className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs">
                  <option>String</option>
                  <option>Number</option>
                  <option>Boolean</option>
                  <option>Date</option>
                </select>
              </div>

              <div className="field-mapping-item flex items-center">
                <input
                  type="checkbox"
                  id="field-bedrooms"
                  className="h-4 w-4 mr-3"
                  defaultChecked
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <Label htmlFor="field-bedrooms" className="font-medium">
                      Bedrooms
                    </Label>
                    <Badge className="ml-2 bg-green-500 text-white">
                      Auto-detected
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Number of bedrooms
                  </p>
                </div>
                <select className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs">
                  <option>Number</option>
                  <option>String</option>
                  <option>Boolean</option>
                  <option>Date</option>
                </select>
              </div>

              <div className="field-mapping-item flex items-center">
                <input
                  type="checkbox"
                  id="field-bathrooms"
                  className="h-4 w-4 mr-3"
                  defaultChecked
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <Label htmlFor="field-bathrooms" className="font-medium">
                      Bathrooms
                    </Label>
                    <Badge className="ml-2 bg-green-500 text-white">
                      Auto-detected
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Number of bathrooms
                  </p>
                </div>
                <select className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs">
                  <option>Number</option>
                  <option>String</option>
                  <option>Boolean</option>
                  <option>Date</option>
                </select>
              </div>

              <div className="field-mapping-item flex items-center border-dashed">
                <input
                  type="checkbox"
                  id="field-custom"
                  className="h-4 w-4 mr-3"
                />
                <div className="flex-1">
                  <Input
                    placeholder="Add custom field"
                    className="border-none text-sm p-0 h-6"
                  />
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
                <CardTitle className="text-sm">
                  Create calculated fields
                </CardTitle>
                <CardDescription>
                  Use formulas to generate new fields from existing data
                </CardDescription>
              </CardHeader>
              <CardContent className="py-0">
                <div className="space-y-3">
                  <div className="field-mapping-item">
                    <div className="flex items-center justify-between">
                      <Label className="font-medium">
                        Price Per Square Foot
                      </Label>
                      <Badge variant="outline">Derived</Badge>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-muted-foreground mr-2">
                        Formula:
                      </span>
                      <code className="text-xs bg-muted/50 p-1 rounded">
                        price / squareFeet
                      </code>
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
  );
}

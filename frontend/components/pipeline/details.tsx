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

export function PipelineDetails() {
  return (
    <Card className="border-0 hover:border-highlight-border transition-all duration-200">
      <CardHeader>
        <CardTitle>Pipeline Details</CardTitle>
        <CardDescription>
          Basic information about your data pipeline
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Pipeline Name</Label>
            <Input id="name" placeholder="e.g., Property Listings Pipeline" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this pipeline collects and how it will be used"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (optional)</Label>
            <Input
              id="tags"
              placeholder="e.g., real-estate, properties, listings"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Separate tags with commas
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

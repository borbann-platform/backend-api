import { Switch } from "../ui/switch";
import { BrainCircuit } from "lucide-react";
import { Label } from "../ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";

export function PipelineAiAssistant(){
    return (
      <Card className="mt-6 border-2 hover:border-highlight-border transition-all duration-200">
        <CardHeader>
          <div>
            <CardTitle className="text-lg flex items-center">
              <BrainCircuit className="mr-2 h-5 w-5 text-primary" />
              AI Assistant
            </CardTitle>
            <CardDescription>
              Customize how AI processes your data
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ai-prompt">Additional Instructions for AI</Label>
              <Textarea
                id="ai-prompt"
                placeholder="E.g., Focus on extracting pricing trends, ignore promotional content, prioritize property features..."
                rows={4}
                className="border-primary/20"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Provide specific instructions to guide the AI in processing your
                data sources
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="detect-fields">
                    Auto-detect common fields
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically identify price, location, etc.
                  </p>
                </div>
                <Switch id="detect-fields" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="suggest-mappings">
                    Suggest field mappings
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Get AI suggestions for matching fields across sources
                  </p>
                </div>
                <Switch id="suggest-mappings" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="deduplicate">Deduplicate records</Label>
                  <p className="text-xs text-muted-foreground">
                    Remove duplicate entries automatically
                  </p>
                </div>
                <Switch id="deduplicate" defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
}
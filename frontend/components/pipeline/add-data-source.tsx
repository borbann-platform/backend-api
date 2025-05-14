import { DatabaseIcon, FileUp, Globe, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
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

type SourceType = "website" | "file" | "api";

type Source = {
  id: string;
  type: SourceType;
};

export function AddDataSource() {
  const [sources, setSources] = useState<Source[]>([
    { id: "source-1", type: "website" },
    { id: "source-2", type: "file" },
    { id: "source-3", type: "api" },
  ]);

  const addSource = (type: SourceType) => {
    const newId = `source-${Date.now()}`;
    setSources((prev) => [...prev, { id: newId, type }]);
  };

  const removeSource = (id: string) => {
    setSources((prev) => prev.filter((source) => source.id !== id));
  };

  const renderSourceItem = (source: Source) => {
    const commonProps = {
      className: "border rounded-md mb-4 data-source-card",
      value: source.id,
    };

    return (
      <AccordionItem key={source.id} {...commonProps}>
        <AccordionTrigger className="px-4">
          <div className="flex items-center">
            {source.type === "website" && (
              <Globe className="mr-2 h-5 w-5 text-primary" />
            )}
            {source.type === "file" && (
              <FileUp className="mr-2 h-5 w-5 text-primary" />
            )}
            {source.type === "api" && (
              <DatabaseIcon className="mr-2 h-5 w-5 text-primary" />
            )}
            <span>{`${
              source.type.charAt(0).toUpperCase() + source.type.slice(1)
            } Source`}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          {source.type === "website" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Website URL</Label>
                <Input placeholder="https://example.com/listings" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Additional URLs (optional)</Label>
                  <Badge variant="outline" className="text-xs">
                    Pattern Detection
                  </Badge>
                </div>
                <Textarea
                  placeholder="https://example.com/page2&#10;https://example.com/page3"
                  rows={3}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => removeSource(source.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove Source
                </Button>
              </div>
            </div>
          )}
          {source.type === "file" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Upload File</Label>
                <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your file here, or click to browse
                    </p>
                    <Input type="file" className="mt-2 cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => removeSource(source.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove Source
                </Button>
              </div>
            </div>
          )}
          {source.type === "api" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>API Endpoint URL</Label>
                <Input placeholder="https://api.example.com/data" />
              </div>
              <div className="space-y-2">
                <Label>Authentication Type</Label>
                <select className="w-full border rounded-md px-3 py-2 text-sm">
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
                  onClick={() => removeSource(source.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove Source
                </Button>
              </div>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    );
  };

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
          defaultValue={sources[0]?.id}
        >
          {sources.map(renderSourceItem)}
        </Accordion>

        <div className="flex flex-col gap-2 mt-4">
          <Button
            variant="outline"
            type="button"
            className="w-full justify-start gap-2"
            onClick={() => addSource("website")}
          >
            <Plus className="h-4 w-4" />
            Add Website Source
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-full justify-start gap-2"
            onClick={() => addSource("file")}
          >
            <Plus className="h-4 w-4" />
            Add File Upload Source
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-full justify-start gap-2"
            onClick={() => addSource("api")}
          >
            <Plus className="h-4 w-4" />
            Add API Source
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

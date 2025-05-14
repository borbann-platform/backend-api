"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormContext } from "react-hook-form";

export const PipelineSummary = () => {
  const { getValues } = useFormContext();
  const values = getValues();

  const tags = values.tags
    ? values.tags
        .split(",")
        .map((tag: string) => tag.trim()) // trim each tag
        .filter(Boolean) // filter out empty strings
    : [];

  return (
    <Card className="mt-6 border-0 hover:border-highlight-border transition-all duration-200">
      <CardHeader>
        <CardTitle>Pipeline Summary</CardTitle>
        <CardDescription>
          A quick overview of the pipeline configuration. Review before
          launching.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* details */}
        <section>
          <h3 className="text-xl font-semibold">Pipeline Details</h3>
          <div className="space-y-2">
            <div>
              <strong>Name:</strong> {values.name || "—"}
            </div>
            <div>
              <strong>Description:</strong> {values.description || "—"}
            </div>
            <div>
              <strong>Tags:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.length > 0 ? (
                  tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No tags added
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* data sources */}
        <section>
          <h3 className="text-xl font-semibold">Data Sources</h3>
          {values.dataSources && values.dataSources.length > 0 ? (
            <ul className="list-disc pl-6 space-y-1">
              {values.dataSources.map((src: string, index: number) => (
                <li key={index}>{src}</li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-muted-foreground">
              No data sources added.
            </div>
          )}
        </section>

        {/* AI Assistant */}
        <section>
          <h3 className="text-xl font-semibold">AI Assistant</h3>
          <div className="space-y-2">
            <div>
              <strong>Prompt:</strong> {values.aiPrompt || "—"}
            </div>
            <div>
              <strong>Mode:</strong> {values.aiMode || "Default"}
            </div>
          </div>
        </section>

        {/* schedule */}
        <section>
          <h3 className="text-xl font-semibold">Schedule</h3>
          <div className="space-y-2">
            <div>
              <strong>Frequency:</strong> {values.schedule || "—"}
            </div>
            <div>
              <strong>Start Date:</strong> {values.startDate || "—"}
            </div>
            <div>
              <strong>Timezone:</strong> {values.timezone || "—"}
            </div>
          </div>
        </section>

        {/* form Inputs */}
        <section>
          <h3 className="text-xl font-semibold">Form Inputs</h3>
          <div className="text-sm text-muted-foreground">
            No input fields added yet.
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

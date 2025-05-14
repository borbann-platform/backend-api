"use client";

import { useFormContext } from "react-hook-form";
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
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useFormContext();

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
            <Input
              id="name"
              placeholder="e.g., Property Listings Pipeline"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-destructive mt-1">
              {typeof errors.name?.message === "string"
                ? errors.name.message
                : ""}
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this pipeline collects and how it will be used"
              rows={4}
              {...register("description")}
            />
          </div>
          {errors.description && (
            <p className="text-sm text-destructive mt-1">
              {typeof errors.description?.message === "string"
                ? errors.description.message
                : ""}
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (optional)</Label>
            <Input
              id="tags"
              placeholder="e.g., real-estate, properties, listings"
              {...register("tags")}
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

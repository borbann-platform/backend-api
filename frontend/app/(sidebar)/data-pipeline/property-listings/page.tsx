import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, Play, Trash, Copy } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { PipelineStatus } from "@/components/pipeline/status";
import { PipelineDataSource } from "@/components/pipeline/data-source";
import { PipelineExportData } from "@/components/pipeline/export-data";
import { PipelineDataSchema } from "@/components/pipeline/data-schema";
import { PipelineDataPreview } from "@/components/pipeline/data-preview";
import { PipelineOutputConfig } from "@/components/pipeline/output-config";
import { PipelineRunHistory } from "@/components/pipeline/run-history";
import { PipelineSettings } from "@/components/pipeline/settings";

export default function PipelineDetailsPage() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Property Listings Pipeline"
        breadcrumb={[
          { title: "Home", href: "/" },
          { title: "Data Pipeline", href: "/data-pipeline" },
          {
            title: "Property Listings",
            href: "/data-pipeline/property-listings",
          },
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
          <Button
            variant="outline"
            className="gap-2 border-primary/20 hover:border-primary"
          >
            <Copy className="h-4 w-4" />
            Clone
          </Button>
          <Button
            variant="outline"
            className="gap-2 border-primary/20 hover:border-primary"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            className="gap-2 border-primary/20 hover:border-primary"
          >
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
        <PipelineDataSource />
        <PipelineExportData />
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
            <PipelineDataSchema />
          </TabsContent>

          <TabsContent value="preview" className="mt-4">
            <PipelineDataPreview />
          </TabsContent>

          <TabsContent value="output" className="mt-4">
            <PipelineOutputConfig />
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <PipelineRunHistory />
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <PipelineSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

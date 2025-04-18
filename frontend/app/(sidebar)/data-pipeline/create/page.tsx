import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { PipelineDetails } from "@/components/pipeline/details";
import { PipelineAiAssistant } from "@/components/pipeline/ai-assistant";
import { AddDataSource } from "@/components/pipeline/add-data-source";
import { ScheduleAndInformation } from "@/components/pipeline/schedule-and-information";

export default function CreatePipelinePage() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Create Data Pipeline"
        description="Set up a new automated data collection pipeline"
        breadcrumb={[
          { title: "Home", href: "/" },
          { title: "Data Pipeline", href: "/data-pipeline" },
          { title: "Create", href: "/data-pipeline/create" },
        ]}
      />

      <div className="mt-6">
        <Link href="/data-pipeline">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pipelines
          </Button>
        </Link>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <PipelineDetails />
            <PipelineAiAssistant />
          </div>
          <AddDataSource />
          <div>
            <ScheduleAndInformation />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline">Save as Draft</Button>
          <Button>Create Pipeline</Button>
        </div>
      </div>
    </div>
  );
}

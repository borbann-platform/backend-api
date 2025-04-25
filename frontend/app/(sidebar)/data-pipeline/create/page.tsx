import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CratePipelineForm from "./create-pipeline-multiform";

export default function CreatePipelinePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mt-6">
        <Link href="/data-pipeline">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pipelines
          </Button>
        </Link>
        <CratePipelineForm />
        <div className="mt-6 flex justify-end space-x-4">
          {/* <Button variant="outline">Save as Draft</Button>
          <Button>Create Pipeline</Button> */}
        </div>
      </div>
    </div>
  );
}

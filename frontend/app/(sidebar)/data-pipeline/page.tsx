import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { PipelineCard } from "@/components/pipeline/card";

export default function DataPipelinePage() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Data Pipelines"
        description="Manage your automated data collection pipelines"
        breadcrumb={[
          { title: "Home", href: "/" },
          { title: "Data Pipeline", href: "/data-pipeline" },
        ]}
      />

      <div className="flex justify-between items-center mt-6">
        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Active Pipelines</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
            <TabsTrigger value="all">All Pipelines</TabsTrigger>
          </TabsList>

          <div className="flex justify-end mt-4">
            <Link href="/data-pipeline/create">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Pipeline
              </Button>
            </Link>
          </div>

          <TabsContent value="active" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <PipelineCard
                title="Property Listings"
                description="Scrapes real estate listings from multiple websites"
                status="active"
                lastRun="2 hours ago"
                nextRun="Tomorrow at 9:00 AM"
                sources={3}
                records={1240}
                aiPowered={true}
              />

              <PipelineCard
                title="Rental Market Data"
                description="Collects rental prices and availability"
                status="active"
                lastRun="Yesterday"
                nextRun="In 3 days"
                sources={2}
                records={830}
                aiPowered={true}
              />

              <PipelineCard
                title="Price Comparison"
                description="Tracks property price changes over time"
                status="error"
                lastRun="2 days ago"
                nextRun="Scheduled retry in 12 hours"
                sources={4}
                records={1560}
                error="Connection timeout on 1 source"
              />
            </div>
          </TabsContent>

          <TabsContent value="paused" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <PipelineCard
                title="Commercial Properties"
                description="Collects data on commercial real estate"
                status="paused"
                lastRun="1 week ago"
                nextRun="Paused"
                sources={2}
                records={450}
              />
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <PipelineCard
                title="Property Listings"
                description="Scrapes real estate listings from multiple websites"
                status="active"
                lastRun="2 hours ago"
                nextRun="Tomorrow at 9:00 AM"
                sources={3}
                records={1240}
                aiPowered={true}
              />

              {/* mock pipeline card with data */}
              <PipelineCard
                title="Rental Market Data"
                description="Collects rental prices and availability"
                status="active"
                lastRun="Yesterday"
                nextRun="In 3 days"
                sources={2}
                records={830}
                aiPowered={true}
              />

              <PipelineCard
                title="Price Comparison"
                description="Tracks property price changes over time"
                status="error"
                lastRun="2 days ago"
                nextRun="Scheduled retry in 12 hours"
                sources={4}
                records={1560}
                error="Connection timeout on 1 source"
              />

              <PipelineCard
                title="Commercial Properties"
                description="Collects data on commercial real estate"
                status="paused"
                lastRun="1 week ago"
                nextRun="Paused"
                sources={2}
                records={450}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

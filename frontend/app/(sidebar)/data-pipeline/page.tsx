import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Database, Play, Plus, RefreshCw, Pause, AlertTriangle, Copy } from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/page-header"

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
  )
}

interface PipelineCardProps {
  title: string
  description: string
  status: "active" | "paused" | "error"
  lastRun: string
  nextRun: string
  sources: number
  records: number
  error?: string
  aiPowered?: boolean
}

function PipelineCard({
  title,
  description,
  status,
  lastRun,
  nextRun,
  sources,
  records,
  error,
  aiPowered,
}: PipelineCardProps) {
  return (
    <Card className={`pipeline-card ${status === "active" ? "border-2 border-green-500 dark:border-green-600" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <StatusBadge status={status} />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Last run:</span>
            <span className="ml-1 font-medium">{lastRun}</span>
          </div>
          <div className="flex items-center text-sm">
            <RefreshCw className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Next run:</span>
            <span className="ml-1 font-medium">{nextRun}</span>
          </div>
          <div className="flex items-center text-sm">
            <Database className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Sources:</span>
            <span className="ml-1 font-medium">{sources}</span>
            <span className="mx-2">•</span>
            <span className="text-muted-foreground">Records:</span>
            <span className="ml-1 font-medium">{records}</span>
          </div>
          {error && (
            <div className="flex items-center text-sm text-destructive mt-2">
              <AlertTriangle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/data-pipeline/${title.toLowerCase().replace(/\s+/g, "-")}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 text-primary border-primary/20 hover:border-primary">
            <Copy className="h-4 w-4" />
          </Button>
          {status === "active" ? (
            <Button variant="outline" size="icon" className="h-8 w-8 border-primary/20 hover:border-primary">
              <Pause className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" size="icon" className="h-8 w-8 border-primary/20 hover:border-primary">
              <Play className="h-4 w-4" />
            </Button>
          )}
          <Button variant="outline" size="icon" className="h-8 w-8 border-primary/20 hover:border-primary">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function StatusBadge({ status }: { status: "active" | "paused" | "error" }) {
  if (status === "active") {
    return (
      <Badge variant="default" className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
        Active
      </Badge>
    )
  } else if (status === "paused") {
    return <Badge variant="secondary">Paused</Badge>
  } else {
    return <Badge variant="destructive">Error</Badge>
  }
}


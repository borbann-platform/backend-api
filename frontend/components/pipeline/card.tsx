import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Clock,
  Copy,
  Database,
  Pause,
  Play,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "./badge";

interface PipelineCardProps {
  name: string;
  description: string;
  status: "active" | "paused" | "error";
  lastRun: string;
  nextRun: string;
  sources: number;
  records: number;
  error?: string;
  aiPowered?: boolean;
}

export function PipelineCard({
  name,
  description,
  status,
  lastRun,
  nextRun,
  sources,
  records,
  error,
}: PipelineCardProps) {
  return (
    <Card
      className={`pipeline-card ${
        status === "active"
          ? "border-2 border-green-500 dark:border-green-600"
          : ""
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <StatusBadge status={status} />
        </div>
        {/* <CardDescription>{description}</CardDescription> */}
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
        <Link
          href={`/data-pipeline/${name.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 text-primary border-primary/20 hover:border-primary"
          >
            <Copy className="h-4 w-4" />
          </Button>
          {status === "active" ? (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-primary/20 hover:border-primary"
            >
              <Pause className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-primary/20 hover:border-primary"
            >
              <Play className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-primary/20 hover:border-primary"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

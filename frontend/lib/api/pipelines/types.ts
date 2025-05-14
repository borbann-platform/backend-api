// types.ts

export interface ApiConfig {
  url: string;
  token?: string | null;
}

export interface ApiSource {
  type: "api";
  config: ApiConfig;
}

export interface FileConfig {
  path: string;
  format?: "csv" | "json" | "sqlite";
}

export interface FileSource {
  type: "file";
  config: FileConfig;
}

export interface ScrapeConfig {
  urls: string[];
  schema_file?: string | null;
  prompt?: string | null;
}

export interface ScrapeSource {
  type: "scrape";
  config: ScrapeConfig;
}

export type DataSource = ApiSource | FileSource | ScrapeSource;

export interface Pipeline {
  id: string;
  name?: string | null;
  sources: DataSource[];
  created_at: string;
}

export interface PipelineCreate {
  name?: string | null;
  sources: DataSource[];
}

export interface Run {
  id: string;
  pipeline_id: string;
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
  started_at: string;
  finished_at?: string | null;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

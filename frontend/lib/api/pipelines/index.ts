import { Pipeline, PipelineCreate, Run } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// if (typeof window !== "undefined") {
//   console.log(API_BASE);
// }

// utility for handling fetch responses
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(JSON.stringify(errorBody));
  }
  return res.json();
}

// GET /pipelines
export async function listPipelines(): Promise<Pipeline[]> {
  const res = await fetch(`${API_BASE}/pipelines`);
  return handleResponse<Pipeline[]>(res);
}

// POST /pipelines
export async function createPipeline(
  payload: PipelineCreate
): Promise<Pipeline> {
  const res = await fetch(`${API_BASE}/pipelines`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<Pipeline>(res);
}

// GET /pipelines/{pipeline_id}
export async function getPipeline(pipeline_id: string): Promise<Pipeline> {
  const res = await fetch(`${API_BASE}/pipelines/${pipeline_id}`);
  return handleResponse<Pipeline>(res);
}

// POST /pipelines/{pipeline_id}/run
export async function runPipeline(pipeline_id: string): Promise<Run> {
  const res = await fetch(`${API_BASE}/pipelines/${pipeline_id}/run`, {
    method: "POST",
  });
  return handleResponse<Run>(res);
}

// GET /pipelines/{pipeline_id}/runs
export async function listRuns(pipeline_id: string): Promise<Run[]> {
  const res = await fetch(`${API_BASE}/pipelines/${pipeline_id}/runs`);
  return handleResponse<Run[]>(res);
}

// GET /pipelines/{pipeline_id}/runs/{run_id}
export async function getRun(
  pipeline_id: string,
  run_id: string
): Promise<Run> {
  const res = await fetch(
    `${API_BASE}/pipelines/${pipeline_id}/runs/${run_id}`
  );
  return handleResponse<Run>(res);
}

// GET /pipelines/{pipeline_id}/runs/{run_id}/results
export async function getRunResults(
  pipeline_id: string,
  run_id: string
): Promise<any[]> {
  const res = await fetch(
    `${API_BASE}/pipelines/${pipeline_id}/runs/${run_id}/results`
  );
  return handleResponse<any[]>(res);
}

// GET /pipelines/{pipeline_id}/runs/{run_id}/error
export async function getRunError(
  pipeline_id: string,
  run_id: string
): Promise<string> {
  const res = await fetch(
    `${API_BASE}/pipelines/${pipeline_id}/runs/${run_id}/error`
  );
  return handleResponse<string>(res);
}

// SSE: /pipelines/{pipeline_id}/runs/{run_id}/logs/stream
export function streamLogs(
  pipeline_id: string,
  run_id: string,
  onMessage: (data: string) => void,
  onError?: (event: Event) => void
): EventSource {
  const url = `${API_BASE}/pipelines/${pipeline_id}/runs/${run_id}/logs/stream`;
  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    onMessage(event.data);
  };

  eventSource.onerror = (event) => {
    if (onError) onError(event);
    eventSource.close();
  };

  return eventSource;
}

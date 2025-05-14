import { z } from "zod";

export const pipelineSchema = z.object({
  name: z.string().min(1, "Pipeline name is required"),
  description: z.string().min(1, "Description is required"),
  aiPrompt: z.string().optional(),
  tags: z.string().optional(),
});

export type PipelineFormValues = z.infer<typeof pipelineSchema>;

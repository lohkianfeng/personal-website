import { z } from "zod";

export const fileSchema = z.object({
  id: z.number(),
  name: z.string(),
  mimetype: z.string(),
  size: z.number(),
});

export type FileT = z.infer<typeof fileSchema>;

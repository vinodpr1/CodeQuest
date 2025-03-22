import { z } from "zod";

export const Isubmission = z.object({
  code: z.string(),
  questionId: z.string(),
  languageId: z.string(),
  activeEventId: z.string().optional(),
});

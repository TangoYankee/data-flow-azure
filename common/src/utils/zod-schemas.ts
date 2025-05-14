import { z } from "zod"

export const buildOptionsSchema = z.object({
  skipDependents: z.boolean().optional(),
  skipDepdendencies: z.boolean().optional(),
  skipTiles: z.boolean().optional(),
  skipDownloads: z.boolean().optional()
})

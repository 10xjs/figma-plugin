import { z } from 'zod';

export const resizeMessageSchema = z.object({
  type: z.literal('resize'),
  width: z.number().int(),
  height: z.number().int(),
});

export const messageSchema = z.union([
  resizeMessageSchema,
  resizeMessageSchema,
]);

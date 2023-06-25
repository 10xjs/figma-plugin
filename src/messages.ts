import { z } from 'zod';

import { variableCollectionSchema, variableSchema } from './schema';

export const resizeMessageSchema = z.object({
  type: z.literal('resize'),
  width: z.number().int(),
  height: z.number().int(),
});

export const notifyActionSchema = z.never();

export const notifyOptionsSchema = z.object({
  timeout: z.number().optional(),
  error: z.boolean().optional(),
  button: z
    .object({
      text: z.string(),
      action: notifyActionSchema,
    })
    .optional(),
});

export type NotifyOptions = z.infer<typeof notifyOptionsSchema>;

export const notifyMessageSchema = z.object({
  type: z.literal('notify'),
  message: z.string(),
  options: notifyOptionsSchema.optional(),
});

export const initMessageSchema = z.object({
  type: z.literal('init'),
  localCollections: z.array(variableCollectionSchema),
  localVariables: z.array(variableSchema),
});

export const uiMessageSchema = z.union([
  resizeMessageSchema,
  notifyMessageSchema,
]);

export const pluginMessageSchema = z.union([
  initMessageSchema,
  initMessageSchema,
]);

import { z } from 'zod';

import { variableCollectionSchema, variableSchema } from './schema';

export const resizeMessageSchema = z.object({
  type: z.literal('resize'),
  width: z.number().int(),
  height: z.number().int(),
});

export const initMessageSchema = z.object({
  type: z.literal('init'),
  localCollections: z.array(variableCollectionSchema),
  localVariables: z.array(variableSchema),
});

export const uiMessageSchema = z.union([
  resizeMessageSchema,
  resizeMessageSchema,
]);

export const pluginMessageSchema = z.union([
  initMessageSchema,
  initMessageSchema,
]);

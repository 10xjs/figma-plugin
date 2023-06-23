import { z } from 'zod';

export const variableResolvedDataTypeSchema = z.enum([
  'BOOLEAN',
  'COLOR',
  'FLOAT',
  'STRING',
]);

export const VariableResolvedDataType = variableResolvedDataTypeSchema.enum;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type VariableResolvedDataType = z.infer<
  typeof variableResolvedDataTypeSchema
>;

export const variableAliasSchema = z.object({
  type: z.literal('VARIABLE_ALIAS'),
  id: z.string(),
});

export type VariableAlias = z.infer<typeof variableAliasSchema>;

export const rgbaSchema = z.object({
  r: z.number(),
  g: z.number(),
  b: z.number(),
  a: z.number(),
});

export type Rgba = z.infer<typeof rgbaSchema>;

export const rgbSchema = z.object({
  r: z.number(),
  g: z.number(),
  b: z.number(),
});

export type Rgb = z.infer<typeof rgbSchema>;

export const variableValueSchema = z.union([
  z.boolean(),
  z.string(),
  z.number(),
  rgbaSchema,
  rgbSchema,
  variableAliasSchema,
]);

export type VariableValue = z.infer<typeof variableValueSchema>;

export const variableScopeSchema = z.enum([
  'ALL_SCOPES',
  'TEXT_CONTENT',
  'CORNER_RADIUS',
  'WIDTH_HEIGHT',
  'GAP',
  'ALL_FILLS',
  'FRAME_FILL',
  'SHAPE_FILL',
  'TEXT_FILL',
  'STROKE',
]);

export const VariableScope = variableScopeSchema.enum;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type VariableScope = z.infer<typeof variableScopeSchema>;

export const variableSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  remote: z.boolean(),
  variableCollectionId: z.string(),
  key: z.string(),
  resolvedType: variableResolvedDataTypeSchema,
  valuesByMode: z.record(variableValueSchema),
  scopes: z.array(variableScopeSchema),
});

export type Variable = z.infer<typeof variableSchema>;

export const variableCollectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  remote: z.boolean(),
  variableIds: z.array(z.string()),
  defaultModeId: z.string(),
  key: z.string(),
  modes: z.array(
    z.object({
      modeId: z.string(),
      name: z.string(),
    })
  ),
});

export type VariableCollection = z.infer<typeof variableCollectionSchema>;

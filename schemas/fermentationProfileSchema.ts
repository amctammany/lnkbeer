import { FermentationStepType } from "@prisma/client";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const fermentationStepSchema = zfd.formData({
  id: zfd.text(z.string().optional()).nullable(),
  fermentationProfileId: zfd.text(z.string().optional()).nullable(),
  rank: zfd.numeric(z.number().min(0)),
  name: zfd.text(z.string().optional().nullable()),
  type: z
    .nativeEnum(FermentationStepType)
    .default(FermentationStepType.primary),
  rampTime: zfd.numeric(z.number().min(0).optional()),
  time: zfd.numeric(z.number().min(0)),
  temperature: zfd.numeric(z.number()),
});
export const fermentationProfileSchema = zfd.formData({
  id: zfd.text(z.string().optional()).nullable(),
  name: zfd.text(),
  slug: zfd.text(z.string().optional()).nullable(),
  userId: zfd.text(z.string().optional()).nullable(),
  forkedFrom: zfd.text(z.string().optional()).nullable(),
  description: zfd.text(z.string().optional()).nullable(),
  boilTime: zfd.numeric(z.number().min(0).optional()).nullable(),
  batchVolume: zfd.numeric(z.number().min(0).optional()).nullable(),
  boilOffRate: zfd.numeric(z.number().min(0).optional()).nullable(),
  trubLoss: zfd.numeric(z.number().min(0).optional()).nullable(),
  fermentationLoss: zfd.numeric(z.number().min(0).optional()).nullable(),
  fermenterLoss: zfd.numeric(z.number().min(0).optional()).nullable(),
  fermentationEfficiency: zfd
    .numeric(z.number().min(0).max(100).optional())
    .nullable(),
  brewEfficiency: zfd.numeric(z.number().min(0).max(100).optional()).nullable(),
  //steps: zfd.repeatableOfType(fermentationStepSchema),
});
export type FermentationStepSchema = z.infer<typeof fermentationStepSchema>;
export type FermentationProfileSchema = z.infer<
  typeof fermentationProfileSchema
>;

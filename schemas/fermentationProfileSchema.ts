import { FermentationStepType } from "@prisma/client";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const fermentationStepSchema = zfd.formData({
  id: zfd.text(z.string().optional()),
  fermentationProfileId: zfd.text(z.string().optional()),
  rank: zfd.numeric(z.number().min(0)),
  name: zfd.text(z.string().optional()),
  type: z
    .nativeEnum(FermentationStepType)
    .default(FermentationStepType.primary),
  rampTime: zfd.numeric(z.number().optional()),
  time: zfd.numeric(z.number()),
  temperature: zfd.numeric(z.number()),
});
export const fermentationSchema = zfd.formData({
  id: zfd.text(z.string().optional()),
  name: zfd.text(),
  userId: zfd.text(z.string().optional()),
  forkedFrom: zfd.text(z.string().optional()),
  description: zfd.text(z.string().optional()),
  boilTime: zfd.numeric(z.number().min(0).optional()),
  batchVolume: zfd.numeric(z.number().min(0).optional()),
  boilOffRate: zfd.numeric(z.number().min(0).optional()),
  trubLoss: zfd.numeric(z.number().min(0).optional()),
  fermentationLoss: zfd.numeric(z.number().min(0).optional()),
  fermenterLoss: zfd.numeric(z.number().min(0).optional()),
  fermentationEfficiency: zfd.numeric(z.number().min(0).max(100).optional()),
  brewEfficiency: zfd.numeric(z.number().min(0).max(100).optional()),
});

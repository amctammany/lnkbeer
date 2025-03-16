import { MashStepType } from "@prisma/client";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const mashStepSchema = zfd.formData({
  id: zfd.text(z.string().optional()).nullable(),
  mashProfileId: zfd.text(z.string().optional()).nullable(),
  rank: zfd.numeric(z.number().min(0)),
  name: zfd.text(z.string().optional()).nullable(),
  type: z.nativeEnum(MashStepType).default(MashStepType.temperature),
  rampTime: zfd.numeric(z.number().optional()).nullable(),
  time: zfd.numeric(z.number()),
  temperature: zfd.numeric(z.number()),
});
export const mashProfileSchema = zfd.formData({
  id: zfd.text(z.string().optional()).nullable(),
  name: zfd.text(),
  userId: zfd.text(z.string().optional()).nullable(),
  forkedFrom: zfd.text(z.string().optional()).nullable(),
  description: zfd.text(z.string().optional()).nullable(),
  boilTime: zfd.numeric(z.number().min(0).optional()).nullable(),
  batchVolume: zfd.numeric(z.number().min(0).optional()).nullable(),
  boilOffRate: zfd.numeric(z.number().min(0).optional()).nullable(),
  trubLoss: zfd.numeric(z.number().min(0).optional()).nullable(),
  mashLoss: zfd.numeric(z.number().min(0).optional()).nullable(),
  fermenterLoss: zfd.numeric(z.number().min(0).optional()),
  mashEfficiency: zfd.numeric(z.number().min(0).max(100).optional()).nullable(),
  brewEfficiency: zfd.numeric(z.number().min(0).max(100).optional()).nullable(),
  steps: zfd.repeatableOfType(mashStepSchema),
});

export type MashStepSchema = z.infer<typeof mashStepSchema>;
export type MashProfileSchema = z.infer<typeof mashProfileSchema>;

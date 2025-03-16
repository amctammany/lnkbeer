import { SpargeMethodType } from "@prisma/client";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const equipmentProfileSchema = zfd.formData({
  id: zfd.text(z.string().optional()),
  name: zfd.text(),
  userId: zfd.text(z.string().optional()).nullable(),
  forkedFrom: zfd.text(z.string().optional()).nullable(),
  description: zfd.text(z.string().optional()).nullable(),
  boilTime: zfd.numeric(z.number().min(0).optional()).nullable(),
  preboilVolume: zfd.numeric(z.number().min(0).optional()).nullable(),
  batchVolume: zfd.numeric(z.number().min(0).optional()).nullable(),
  grainAbsorption: zfd.numeric(z.number().min(0).optional()).nullable(),
  waterGrainRatio: zfd.numeric(z.number().min(0).optional()).nullable(),
  fermenterterTopOff: zfd.numeric(z.number().min(0).optional()).nullable(),
  boilOffRate: zfd.numeric(z.number().min(0).optional()).nullable(),

  kettleTopOff: zfd.numeric(z.number().min(0).optional()).nullable(),
  mashTunVolume: zfd.numeric(z.number().min(0).optional()).nullable(),
  mashTunWeight: zfd.numeric(z.number().min(0).optional()).nullable(),
  mashTunHeatCapacity: zfd.numeric(z.number().min(0).optional()).nullable(),
  trubLoss: zfd.numeric(z.number().min(0).optional()).nullable(),
  mashLoss: zfd.numeric(z.number().min(0).optional()).nullable(),
  fermenterLoss: zfd.numeric(z.number().min(0).optional()).nullable(),
  mashEfficiency: zfd.numeric(z.number().min(0).max(100).optional()).nullable(),
  brewEfficiency: zfd.numeric(z.number().min(0).max(100).optional()).nullable(),
  spargeMethod: z
    .nativeEnum(SpargeMethodType)
    .optional()
    .default(SpargeMethodType.default)
    .nullable(),
});
export type EquipmentProfileSchema = z.infer<typeof equipmentProfileSchema>;

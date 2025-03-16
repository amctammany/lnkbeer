import { YeastFlocculation, YeastForm, YeastType } from "@prisma/client";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const yeastSchema = zfd.formData({
  id: zfd.text(z.string().optional()),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  manufacturer: zfd.text(z.string().optional()),
  type: z.nativeEnum(YeastType).optional().default(YeastType.Ale),
  flocculation: z.nativeEnum(YeastFlocculation).optional(),
  form: z.nativeEnum(YeastForm).optional(),
  attenuationRange: zfd
    .numeric(z.number().min(0).max(1).optional())
    .array()
    .length(2),
  attenuationLow: zfd.numeric(z.number().min(0).max(1).optional()),
  attenuationHigh: zfd.numeric(z.number().min(0).max(1).optional()),
  attenuation: zfd.numeric(z.number().min(0).max(1).optional()),
  tempRange: zfd.numeric(z.number()).array().length(2),
  tempLow: zfd.numeric(z.number().optional()),
  tempHigh: zfd.numeric(z.number().optional()),
  usage: zfd.text(z.string().optional()),
  notes: zfd.text(z.string().optional()),
});
export type YeastSchema = z.infer<typeof yeastSchema>;

import { YeastFlocculation, YeastForm, YeastType } from "@prisma/client";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const parseYeast = (data: YeastSchema) => {
  const { tempRange, attenuationRange, ...rest } = data;
  return {
    ...rest,
    tempLow: tempRange?.min,
    tempHigh: tempRange?.max,
    attenuationLow: attenuationRange?.min,
    attenuationHigh: attenuationRange?.max,
  };
};
export const yeastSchema = zfd.formData({
  id: zfd.text(z.string().optional()),
  userId: zfd.text(z.string().optional()),
  name: zfd.text(),
  description: zfd.text(z.string().optional()).nullable(),
  manufacturer: zfd.text(z.string().optional()).nullable(),
  type: z.nativeEnum(YeastType).optional().default(YeastType.Ale),
  flocculation: z.nativeEnum(YeastFlocculation).optional(),
  form: z.nativeEnum(YeastForm).optional(),
  attenuationRange: z.object({
    min: z.number().min(0).max(100).optional(),
    max: z.number().min(0).max(100).optional(),
  }),
  tempRange: z.object({
    min: z.number().min(0).max(212).optional(),
    max: z.number().min(0).max(212).optional(),
  }),
  //.numeric(z.number().min(0).max(1).optional())
  //.array()
  //.length(2),
  attenuationLow: zfd.numeric(z.number().min(0).max(100).optional()),
  attenuationHigh: zfd.numeric(z.number().min(0).max(100).optional()),
  attenuation: zfd.numeric(z.number().min(0).max(100).optional()),
  //tempRange: zfd.numeric(z.number()).array().length(2),
  tempLow: zfd.numeric(z.number().optional()),
  tempHigh: zfd.numeric(z.number().optional()),
  usage: zfd.text(z.string().optional()).nullable(),
  notes: zfd.text(z.string().optional()).nullable(),
});
export type YeastSchema = z.infer<typeof yeastSchema>;

import { z } from "zod";
import { zfd } from "zod-form-data";

export const waterProfileSchema = zfd.formData({
  id: zfd.text(z.string().optional()).nullable(),
  name: zfd.text(),
  userId: zfd.text(z.string().optional()).nullable(),
  forkedFrom: zfd.text(z.string().optional()).nullable(),
  description: zfd.text(z.string().optional()).nullable(),
  calcium: zfd.numeric(z.number().min(0).default(0)).nullable(),
  magnesium: zfd.numeric(z.number().min(0).default(0)).nullable(),
  sodium: zfd.numeric(z.number().min(0).default(0)).nullable(),
  chloride: zfd.numeric(z.number().min(0).default(0)).nullable(),
  sulfate: zfd.numeric(z.number().min(0).default(0)).nullable(),
  bicarbonate: zfd.numeric(z.number().min(0).default(0)).nullable(),
});
export type WaterProfileSchema = z.infer<typeof waterProfileSchema>;

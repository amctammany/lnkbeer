import { z } from "zod";
import { zfd } from "zod-form-data";

export const fermentableSchema = zfd.formData({
  id: zfd.text(z.string().optional()),
  name: zfd.text(),
  description: zfd.text(z.string().optional()).nullable(),
  country: zfd.text(z.string().optional()).nullable(),
  notes: zfd.text(z.string().optional()).nullable(),
  stability: zfd.text(z.string().optional()).nullable(),
  power: zfd.numeric(z.number().min(0).max(120).optional()).nullable(),
  maxUsage: zfd.numeric(z.number().min(0).max(100).optional()).nullable(),
  color: zfd.numeric(z.number().min(0).max(600).optional()).nullable(),
  potential: zfd.numeric(z.number().min(0).max(2).optional()).nullable(),
});

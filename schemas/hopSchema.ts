import slugify from "@/lib/slugify";
import { HopInput } from "@/types/ingredient";
import { HopUsage } from "@prisma/client";
import { z } from "zod";
import { zfd } from "zod-form-data";

export function parseHop(data: HopSchema) {
  //if (!data) return null;
  const {
    alphaRange,
    betaRange,
    caryophylleneRange,
    cohumuloneRange,
    farneseneRange,
    myrceneRange,
    totalOilRange,
    humuleneRange,
    ...rest
  } = data || { name: "" };
  return {
    ...rest,
    alphaLow: alphaRange?.[0],
    alphaHigh: alphaRange?.[1],
    betaLow: betaRange?.[0],
    betaHigh: betaRange?.[1],
    caryophylleneLow: caryophylleneRange?.[0],
    caryophylleneHigh: caryophylleneRange?.[1],
    farneseneLow: farneseneRange?.[0],
    farneseneHigh: farneseneRange?.[1],
    humuleneLow: humuleneRange?.[0],
    humuleneHigh: humuleneRange?.[1],
    cohumuloneLow: cohumuloneRange?.[0],
    cohumuloneHigh: cohumuloneRange?.[1],
    totalOilLow: totalOilRange?.[0],
    totalOilHigh: totalOilRange?.[1],
    myrceneLow: myrceneRange?.[0],
    myrceneHigh: myrceneRange?.[1],
    slug: slugify(rest.name, { lower: true }),
  } as HopInput;
}

export const hopSchema = zfd.formData({
  id: zfd.text(z.string().optional()),
  userId: zfd.text(z.string().optional()),
  name: zfd.text(z.string()),
  description: zfd.text(z.string().optional()).nullable(),
  flavor: zfd.text(z.string().optional()).nullable(),
  characteristics: zfd.text(z.string().optional()).nullable(),
  country: zfd.text(z.string().optional()).nullable(),
  usage: z.nativeEnum(HopUsage).optional().default(HopUsage.dual).nullable(),
  alphaRange: zfd.numeric(z.number()).array().length(2).optional(),
  alpha: zfd.numeric(z.number().min(0).max(40).optional()).nullable(),
  betaRange: zfd.numeric().array().length(2).optional(),
  beta: zfd.numeric(z.number().min(0).max(40).optional()).nullable(),
  caryophyllene: zfd.numeric(z.number().min(0).max(30).optional()).nullable(),
  caryophylleneRange: zfd.numeric().array().length(2).optional(),
  cohumulone: zfd.numeric(z.number().min(0).max(70).optional()).nullable(),
  cohumuloneRange: zfd.numeric().array().length(2).optional(),
  farnesene: zfd.numeric(z.number().min(0).max(50).optional()).nullable(),
  farneseneRange: zfd.numeric().array().length(2).optional(),
  humulene: zfd.numeric(z.number().min(0).max(50).optional()).nullable(),
  humuleneRange: zfd.numeric().array().length(2).optional(),
  myrcene: zfd.numeric(z.number().min(0).max(80).optional()).nullable(),
  myrceneRange: zfd.numeric().array().length(2).optional(),
  totalOil: zfd.numeric(z.number().min(0).max(40).optional()).nullable(),
  totalOilRange: zfd.numeric().array().length(2).optional(),
  purpose: zfd.text(z.string().optional()).nullable(),
  notes: zfd.text(z.string().optional()).nullable(),
});

export type HopSchema = z.infer<typeof hopSchema>;
export const hopNoteSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()).nullable(),
  uid: zfd.numeric(z.number().optional()),
  userEmail: zfd.text(z.string()),
  slug: zfd.text(z.string()),
  hopId: zfd.text(z.string()),
  notes: zfd.text(z.string().optional()).nullable(),
  sensoryPanel: z.object({
    notes: zfd.text(z.string().optional()).nullable(),
    id: zfd.numeric(z.number().optional()).nullable(),
    sweetAromatic: zfd.numeric(z.number().default(0)),
    berry: zfd.numeric(z.number().default(0)),
    stoneFruit: zfd.numeric(z.number().default(0)),
    pomme: zfd.numeric(z.number().default(0)),
    melon: zfd.numeric(z.number().default(0)),
    tropical: zfd.numeric(z.number().default(0)),
    citrus: zfd.numeric(z.number().default(0)),
    floral: zfd.numeric(z.number().default(0)),
    herbal: zfd.numeric(z.number().default(0)),
    vegetal: zfd.numeric(z.number().default(0)),
    grassy: zfd.numeric(z.number().default(0)),
    earthy: zfd.numeric(z.number().default(0)),
    woody: zfd.numeric(z.number().default(0)),
    spicy: zfd.numeric(z.number().default(0)),
    onionGarlic: zfd.numeric(z.number().default(0)),
    driedFruit: zfd.numeric(z.number().default(0)),
    dank: zfd.numeric(z.number().default(0)),
    aromaIds: zfd.repeatable(),
  }),
});
export type HopNoteSchema = z.infer<typeof hopNoteSchema>;

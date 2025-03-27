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
    alphaLow: alphaRange?.min,
    alphaHigh: alphaRange?.max,
    betaLow: betaRange?.min,
    betaHigh: betaRange?.max,
    caryophylleneLow: caryophylleneRange?.min,
    caryophylleneHigh: caryophylleneRange?.max,
    farneseneLow: farneseneRange?.min,
    farneseneHigh: farneseneRange?.max,
    humuleneLow: humuleneRange?.min,
    humuleneHigh: humuleneRange?.max,
    cohumuloneLow: cohumuloneRange?.min,
    cohumuloneHigh: cohumuloneRange?.max,
    totalOilLow: totalOilRange?.min,
    totalOilHigh: totalOilRange?.max,
    myrceneLow: myrceneRange?.min,
    myrceneHigh: myrceneRange?.max,
    slug: slugify(rest.name, { lower: true }),
  } as HopInput;
}

const RangeV = () =>
  z.object({
    min: z.number().min(0).max(100).default(0),
    max: z.number().min(0).max(100).default(100),
  });
export const hopSchema = zfd.formData({
  id: zfd.text(z.string().optional()).nullable(),
  userId: zfd.text(z.string().optional()).nullable(),
  userEmail: zfd.text(z.string().optional()).nullable(),
  name: zfd.text(z.string()),
  description: zfd.text(z.string().optional()).nullable(),
  flavor: zfd.text(z.string().optional()).nullable(),
  characteristics: zfd.text(z.string().optional()).nullable(),
  country: zfd.text(z.string().optional()).nullable(),
  usage: z.nativeEnum(HopUsage).optional().default(HopUsage.dual).nullable(),
  alphaRange: RangeV(), //zfd.numeric(z.number()).array().length(2).optional(),
  alpha: zfd.numeric(z.number().min(0).max(40).optional()).nullable(),
  betaRange: RangeV(),
  beta: zfd.numeric(z.number().min(0).max(40).optional()).nullable(),
  caryophyllene: zfd.numeric(z.number().min(0).max(30).optional()).nullable(),
  caryophylleneRange: RangeV(),
  cohumulone: zfd.numeric(z.number().min(0).max(70).optional()).nullable(),
  cohumuloneRange: RangeV(),
  farnesene: zfd.numeric(z.number().min(0).max(50).optional()).nullable(),
  farneseneRange: RangeV(),
  humulene: zfd.numeric(z.number().min(0).max(50).optional()).nullable(),
  humuleneRange: RangeV(),
  myrcene: zfd.numeric(z.number().min(0).max(80).optional()).nullable(),
  myrceneRange: RangeV(),
  totalOil: zfd.numeric(z.number().min(0).max(40).optional()).nullable(),
  totalOilRange: RangeV(),
  purpose: zfd.text(z.string().optional()).nullable(),
  notes: zfd.text(z.string().optional()).nullable(),
});

export type HopSchema = z.infer<typeof hopSchema>;
export const hopNoteSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()).nullable(),
  userId: zfd.text(z.string()),
  sensoryPanelId: zfd.numeric(z.number().optional()).nullable(),
  uid: zfd.numeric(z.number().optional()),
  userEmail: zfd.text(z.string()),
  year: zfd.numeric(z.number().optional()).nullable(),
  slug: zfd.text(z.string()),
  hopId: zfd.text(z.string()),
  producer: zfd.text(z.string().optional()).nullable(),
  batch: zfd.text(z.string().optional()).nullable(),
  lot: zfd.text(z.string().optional()).nullable(),
  notes: zfd.text(z.string().optional()).nullable(),
  comments: zfd.text(z.string().optional()).nullable(),
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

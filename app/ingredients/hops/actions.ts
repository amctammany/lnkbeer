"use server";
import { prisma } from "@/lib/client";
import { validateSchema } from "@/lib/validateSchema";
import { HopUsage } from "@prisma/client";
import { connect, sensitiveHeaders } from "http2";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { zfd } from "zod-form-data";

type T = z.infer<typeof schema>;
function parseHop(data: T) {
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
  } as any;
}

const schema = zfd.formData({
  id: zfd.text(z.string().optional()),
  name: zfd.text(z.string()),
  description: zfd.text(z.string().optional()),
  flavor: zfd.text(z.string().optional()),
  characteristics: zfd.text(z.string().optional()),
  country: zfd.text(z.string().optional()),
  usage: z.nativeEnum(HopUsage).optional().default(HopUsage.dual),
  alphaRange: zfd.numeric(z.number()).array().length(2),
  alpha: zfd.numeric(z.number().min(0).max(40).optional()),
  betaRange: zfd.numeric().array().length(2),
  beta: zfd.numeric(z.number().min(0).max(40).optional()),
  caryophyllene: zfd.numeric(z.number().min(0).max(30).optional()),
  caryophylleneRange: zfd.numeric().array().length(2),
  cohumulone: zfd.numeric(z.number().min(0).max(70).optional()),
  cohumuloneRange: zfd.numeric().array().length(2),
  farnesene: zfd.numeric(z.number().min(0).max(50).optional()),
  farneseneRange: zfd.numeric().array().length(2),
  humulene: zfd.numeric(z.number().min(0).max(50).optional()),
  humuleneRange: zfd.numeric().array().length(2),
  myrcene: zfd.numeric(z.number().min(0).max(80).optional()),
  myrceneRange: zfd.numeric().array().length(2),
  totalOil: zfd.numeric(z.number().min(0).max(40).optional()),
  totalOilRange: zfd.numeric().array().length(2),
  purpose: zfd.text(z.string().optional()),
  notes: zfd.text(z.string().optional()),
});
const removeSchema = zfd.formData({
  id: zfd.text(),
});
export async function removeHop(formData: FormData) {
  const { id } = removeSchema.parse(formData);
  await prisma.hop.delete({
    where: { id },
  });
  redirect("/recipes");
}
const noteSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  userEmail: zfd.text(z.string()),
  slug: zfd.text(z.string()),
  hopId: zfd.text(z.string()),
  comments: zfd.text(z.string().optional()),
  sensoryPanel: z.object({
    id: zfd.numeric(z.number().optional()),
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
  }),
});

export const createHopNote = async (prev: any, formData: FormData) => {
  const valid = validateSchema(formData, noteSchema);
  console.log(valid);
  if (!valid.success) return valid;
  //const f = validateSchema(formData, schema);
  //const d = schema.parse(formData);
  const { id, userEmail, hopId, slug, comments, sensoryPanel } = valid.data;
  const panel = await prisma.hopSensoryPanel.create({
    data: {
      hop: { connect: { slug } },
      ...Object.keys(sensoryPanel).reduce((acc, k) => {
        acc[k] = sensoryPanel[k] / 10;
        return acc;
      }, {}),
    },
  });
  //const data = parseHop(hop);
  const res = await prisma.hopNote.create({
    data: {
      userEmail,
      hopId,
      slug,
      sensoryPanelId: panel.id,
      //hop: { connect: { id: hopId } },
      comments,
      //sensoryPanel: {
      //connect: { id: panel.id },
      //},
    },
    include: {
      sensoryPanel: true,
      hop: true,
    },
  });
  redirect(`/ingredients/hops/${res.hop.slug}`);
};
export const updateHopNote = async (prev: any, formData: FormData) => {
  const valid = validateSchema(formData, noteSchema);
  if (!valid.success) return valid;
  //console.log(valid.data);
  const { sensoryPanel, slug, userEmail, ...data } = valid.data;
  const es = await prisma.hopSensoryPanel.update({
    where: { id: sensoryPanel?.id },
    data: {
      slug,
      userEmail,
      //...sensoryPanel,
      ...Object.keys(sensoryPanel).reduce((acc, k) => {
        acc[k] = sensoryPanel[k] / 10;
        return acc;
      }, {}),
    },
  });
  console.log(es);
  const res = await prisma.hopNote.update({
    where: { id: { hopId: data.hopId, userEmail } },
    data: {
      ...data,
      sensoryPanel: {
        connect: { id: es.id },
        //update: { where: { id: sensoryPanel?.id }, data: sensoryPanel },
      },
    },
    include: {
      hop: { select: { slug: true } },
      sensoryPanel: true,
    },
  });
  redirect(`/ingredients/hops/${res.hop.slug}`);
};
export const createHop = async (prev: any, formData: FormData) => {
  const valid = validateSchema(formData, schema);
  if (!valid.success) return valid;
  //const f = validateSchema(formData, schema);
  //const d = schema.parse(formData);
  const hop = valid.data;
  const data = parseHop(hop);
  const res = await prisma.hop.create({
    data,
  });
  redirect(`/ingredients/hops/${res.slug}`);
};
export const updateHop = async (prev: any, formData: FormData) => {
  const valid = validateSchema(formData, schema);
  if (!valid.success) return valid;
  const hop = valid.data;
  const data = parseHop(hop);
  const res = await prisma.hop.update({
    where: { id: data.id },
    data,
  });
  redirect(`/ingredients/hops/${res.slug}`);
};

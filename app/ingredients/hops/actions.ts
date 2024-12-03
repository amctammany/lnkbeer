"use server";
import { prisma } from "@/lib/client";
import { validateSchema } from "@/lib/validateSchema";
import { HopUsage } from "@prisma/client";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  country: zfd.text(z.string().optional()),
  usage: z.nativeEnum(HopUsage).optional().default(HopUsage.dual),
  alpha: zfd.numeric(z.number().min(0).max(40).optional()),
  beta: zfd.numeric(z.number().min(0).max(40).optional()),
  caryophyllene: zfd.numeric(z.number().min(0).max(40).optional()),
  cohumulone: zfd.numeric(z.number().min(0).max(40).optional()),
  farnesene: zfd.numeric(z.number().min(0).max(40).optional()),
  humulene: zfd.numeric(z.number().min(0).max(40).optional()),
  myrcene: zfd.numeric(z.number().min(0).max(40).optional()),
  totalOil: zfd.numeric(z.number().min(0).max(40).optional()),
  flavor: zfd.text(z.string().optional()),
  purpose: zfd.text(z.string().optional()),
  notes: zfd.text(z.string().optional()),
});
export const createHop = async (formData: FormData) => {
  const data = validateSchema(formData, schema);
  const res = await prisma.hop.create({
    data: { slug: slugify(data.name, { lower: true }), ...data },
  });
  redirect(`/ingredients/hops/${res.slug}`);
};
export const updateHop = async (formData: FormData) => {
  const data = validateSchema(formData, schema);
  const res = await prisma.hop.update({
    where: { id: data.id },
    data,
  });
  redirect(`/ingredients/hops/${res.slug}`);
};
"use server";
import { prisma } from "@/lib/client";
import { validateSchema } from "@/lib/validateSchema";
import { EquipmentProfile } from "@prisma/client";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { zfd } from "zod-form-data";

const equipmentSchema = zfd.formData({
  id: zfd.text(z.string().optional()),
  name: zfd.text(),
  userId: zfd.text(z.string().optional()),
  forkedFrom: zfd.text(z.string().optional()),
  description: zfd.text(z.string().optional()),
  boilTime: zfd.numeric(z.number().min(0).optional()),
  batchVolume: zfd.numeric(z.number().min(0).optional()),
  boilOffRate: zfd.numeric(z.number().min(0).optional()),
  trubLoss: zfd.numeric(z.number().min(0).optional()),
  mashLoss: zfd.numeric(z.number().min(0).optional()),
  fermenterLoss: zfd.numeric(z.number().min(0).optional()),
  mashEfficiency: zfd.numeric(z.number().min(0).max(100).optional()),
  brewEfficiency: zfd.numeric(z.number().min(0).max(100).optional()),
});

export const createEquipmentProfile = async (prev: any, formData: FormData) => {
  const valid = validateSchema(formData, equipmentSchema);
  if (!valid.success) return valid;

  const { id, userId, forkedFrom, ...data } = valid.data;
  const res = await prisma.equipmentProfile.create({
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
      ...(userId
        ? {
            owner: {
              connect: { id: userId ?? undefined },
            },
          }
        : {}),
      ...(forkedFrom
        ? {
            origin: {
              connect: { id: forkedFrom ?? undefined },
            },
          }
        : {}),
      //include: {
      //origin: true,
      //owner: true,
      //},
    },
  });
  redirect(`/profiles/equipment/${res.slug}`);
};
export const updateEquipmentProfile = async (prev: any, formData: FormData) => {
  //console.log(prev, formData.entries());
  const valid = validateSchema(formData, equipmentSchema);

  if (valid.errors) return valid;
  const { id, userId, forkedFrom, ...rest } =
    valid.data || ({} as EquipmentProfile);
  const res = await prisma.equipmentProfile.update({
    where: { id },
    data: {
      ...rest,
      slug: slugify(rest.name ?? "", { lower: true }),
      ...(userId
        ? {
            owner: {
              connect: { id: userId ?? undefined },
            },
          }
        : {}),
      ...(forkedFrom
        ? {
            origin: {
              connect: { id: forkedFrom ?? undefined },
            },
          }
        : {}),

      /**
      owner: {
        connect: { id: userId ?? undefined },
      },
      origin: {
        connect: { id: forkedFrom ?? undefined },
      },
      */
    },
    //include: {
    //origin: true,
    //owner: true,
    //},
  });
  //return { success: true, data: res };

  redirect(`/profiles/equipment/${res.slug}`);
};

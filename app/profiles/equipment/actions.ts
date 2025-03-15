"use server";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { EquipmentProfile } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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
const removeSchema = zfd.formData({
  slug: zfd.text(),
});
export async function removeEquipmentProfile(formData: FormData) {
  const { slug } = removeSchema.parse(formData);
  await prisma.equipmentProfile.delete({
    where: { slug },
  });
  revalidatePath("/profiles/equipment");
}

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
    },
  });
  redirect(`/profiles/equipment/${res.slug}`);
};
export const updateEquipmentProfile = async (prev: any, formData: FormData) => {
  const valid = validateSchema(formData, equipmentSchema);

  console.log(valid);
  if (!valid.success) return valid;
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
    },
  });

  if (res) {
    console.log("good res", res);
  }
  redirect(`/profiles/equipment/${res.slug}`);
};

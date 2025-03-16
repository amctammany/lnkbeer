"use server";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { EquipmentProfileInput } from "@/types/Profile";
import { EquipmentProfile } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";

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

export const createEquipmentProfile = async (data: EquipmentProfileInput) => {
  //const valid = validateSchema(formData, equipmentSchema);
  //if (!valid.success) return valid;

  const { id, userId, forkedFrom, ...rest } = data;
  const res = await prisma.equipmentProfile.create({
    data: {
      ...rest,
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
export const updateEquipmentProfile = async (data: EquipmentProfileInput) => {
  //const valid = validateSchema(formData, equipmentSchema);
  //if (!valid.success) return valid;
  const { id, userId, forkedFrom, ...rest } = data;
  //valid.data || ({} as EquipmentProfile);
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

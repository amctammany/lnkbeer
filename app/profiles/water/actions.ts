"use server";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { WaterProfileSchema } from "@/schemas/waterProfileSchema";
import { ExtendedWaterProfile, WaterProfileInput } from "@/types/Profile";
import { WaterProfile } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createWaterProfile = async (data: WaterProfileSchema) => {
  //const valid = validateSchema(formData, waterSchema);
  //if (!valid.success) return valid;

  const { id, userId, forkedFrom, ...rest } = data;
  const res = await prisma.waterProfile.create({
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
  redirect(`/profiles/water/${res.slug}`);
};
export const updateWaterProfile = async (data: WaterProfileInput) => {
  //console.log(prev, formData.entries());
  //const valid = validateSchema(formData, waterSchema);

  //if (valid.errors) return valid;
  const { id, userId, forkedFrom, ...rest } = data || ({} as WaterProfile);
  const res = await prisma.waterProfile.update({
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

  redirect(`/profiles/water/${res.slug}`);
};
export const removeWaterProfile = async (src?: WaterProfileInput | null) => {
  if (!src) return;
  await prisma.waterProfile.delete({
    where: {
      id: src.id,
    },
  });
  //console.log(res);
  redirect("/profiles/water");
  //revalidatePath(`/profiles/water/${src?.slug}/edit`);
};

export const duplicateWaterProfile = async (src: ExtendedWaterProfile) => {
  const {
    id,
    userId,
    forks,
    owner,
    origin,
    name: oldName,
    forkedFrom,
    ...data
  } = src;
  const name = `${userId}-${oldName}`;
  const res = await prisma.waterProfile.create({
    data: {
      ...data,
      name,
      slug: slugify(name ?? "", { lower: true }),
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
  revalidatePath(`/profiles/water/${res?.slug}/edit`);
};

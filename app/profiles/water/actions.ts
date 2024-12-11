"use server";
import { prisma } from "@/lib/client";
import { validateSchema } from "@/lib/validateSchema";
import { ExtendedWaterProfile } from "@/types/Profile";
import { WaterProfile } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z, ZodIssue } from "zod";
import { zfd } from "zod-form-data";

const waterSchema = zfd.formData({
  id: zfd.text(z.string().optional()),
  name: zfd.text(),
  userId: zfd.text(z.string().optional()),
  forkedFrom: zfd.text(z.string().optional()),
  description: zfd.text(z.string().optional()),
  calcium: zfd.numeric(z.number().min(0).default(0)),
  magnesium: zfd.numeric(z.number().min(0).default(0)),
  sodium: zfd.numeric(z.number().min(0).default(0)),
  chloride: zfd.numeric(z.number().min(0).default(0)),
  sulfate: zfd.numeric(z.number().min(0).default(0)),
  bicarbonate: zfd.numeric(z.number().min(0).default(0)),
});
export const createWaterProfile = async (prev: any, formData: FormData) => {
  const valid = validateSchema(formData, waterSchema);
  if (!valid.success) return valid;

  const { id, userId, forkedFrom, ...data } = valid.data;
  const res = await prisma.waterProfile.create({
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
  redirect(`/profiles/water/${res.slug}`);
};
export const updateWaterProfile = async (prev: any, formData: FormData) => {
  //console.log(prev, formData.entries());
  const valid = validateSchema(formData, waterSchema);

  if (valid.errors) return valid;
  const { id, userId, forkedFrom, ...rest } =
    valid.data || ({} as WaterProfile);
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

  redirect(`/profiles/water/${res.slug}`);
};
export const removeWaterProfile = async (src: ExtendedWaterProfile) => {
  const res = await prisma.waterProfile.delete({
    where: {
      id: src.id,
    },
  });
  //console.log(res);
  redirect("/profiles/water");
  //revalidatePath(`/profiles/water/${src?.slug}/edit`);
};

export const duplicateWaterProfile = async (src: ExtendedWaterProfile) => {
  console.log(src);
  const { id, userId, owner, origin, name: oldName, forkedFrom, ...data } = src;
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

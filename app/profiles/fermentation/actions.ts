"use server";
import { prisma } from "@/lib/client";
import { validateSchema } from "@/lib/validateSchema";
import { ExtendedFermentationStep } from "@/types/Profile";
import { FermentationProfile, FermentationStepType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { zfd } from "zod-form-data";

const fermentationStepSchema = zfd.formData({
  id: zfd.text(z.string().optional()),
  fermentationProfileId: zfd.text(z.string().optional()),
  rank: zfd.numeric(z.number().min(0)),
  name: zfd.text(z.string().optional()),
  type: z
    .nativeEnum(FermentationStepType)
    .default(FermentationStepType.primary),
  rampTime: zfd.numeric(z.number().optional()),
  time: zfd.numeric(z.number()),
  temperature: zfd.numeric(z.number()),
});
const fermentationSchema = zfd.formData({
  id: zfd.text(z.string().optional()),
  name: zfd.text(),
  userId: zfd.text(z.string().optional()),
  forkedFrom: zfd.text(z.string().optional()),
  description: zfd.text(z.string().optional()),
  boilTime: zfd.numeric(z.number().min(0).optional()),
  batchVolume: zfd.numeric(z.number().min(0).optional()),
  boilOffRate: zfd.numeric(z.number().min(0).optional()),
  trubLoss: zfd.numeric(z.number().min(0).optional()),
  fermentationLoss: zfd.numeric(z.number().min(0).optional()),
  fermenterLoss: zfd.numeric(z.number().min(0).optional()),
  fermentationEfficiency: zfd.numeric(z.number().min(0).max(100).optional()),
  brewEfficiency: zfd.numeric(z.number().min(0).max(100).optional()),
});

export const createFermentationProfile = async (
  prev: any,
  formData: FormData,
) => {
  const valid = validateSchema(formData, fermentationSchema);
  if (!valid.success) return valid;

  const { id, userId, forkedFrom, ...data } = valid.data;
  const res = await prisma.fermentationProfile.create({
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
  redirect(`/profiles/fermentation/${res.slug}`);
};
export const removeFermentationStep = async (src: ExtendedFermentationStep) => {
  const res = await prisma.fermentationStep.delete({
    where: {
      id: src.id,
    },
    include: {
      FermentationProfile: true,
    },
  });
  await prisma.fermentationStep.updateMany({
    where: {
      fermentationProfileId: res.fermentationProfileId,
      rank: { gte: res.rank + 1 },
    },
    data: {
      rank: { decrement: 1 },
    },
  });
  revalidatePath(
    `/profiles/fermentation/${src?.FermentationProfile?.slug}/edit`,
  );
};
export const duplicateFermentationStep = async (
  src: ExtendedFermentationStep,
) => {
  const { id, FermentationProfile, ...data } = src;
  await prisma.fermentationStep.updateMany({
    where: {
      fermentationProfileId: src.fermentationProfileId,
      rank: { gte: src.rank + 1 },
    },
    data: {
      rank: { increment: 1 },
    },
  });
  const res = await prisma.fermentationStep.create({
    data: { ...data, rank: src.rank + 1 },
  });
  revalidatePath(
    `/profiles/fermentation/${src?.FermentationProfile?.slug}/edit`,
  );
};
export const shiftFermentationStep = async (
  dir: -1 | 1,
  src: ExtendedFermentationStep,
) => {
  if (
    src.rank + dir >= 0 ||
    src.rank + dir <= src.FermentationProfile.steps.length - 1
  ) {
    const other = await prisma.fermentationStep.updateMany({
      where: {
        fermentationProfileId: src.fermentationProfileId!,
        rank: src.rank + dir,
      },
      data: {
        rank: src.rank,
      },
    });
    if (other.count === 1) {
      const res = await prisma.fermentationStep.update({
        where: { id: src.id },
        data: { rank: src.rank + dir },
        include: {
          FermentationProfile: {
            select: {
              slug: true,
              steps: true,
            },
          },
        },
      });
      revalidatePath(
        `/profiles/fermentation/${src?.FermentationProfile?.slug}/edit`,
      );
    }
  }
};
const removeSchema = zfd.formData({
  slug: zfd.text(),
});
export async function removeFermentationProfile(formData: FormData) {
  const { slug } = removeSchema.parse(formData);
  await prisma.fermentationProfile.delete({
    where: { slug },
  });
  revalidatePath("/profiles/fermentation");
}

export const createFermentationStep = async (prev: any, formData: FormData) => {
  const valid = validateSchema(formData, fermentationStepSchema);
  if (!valid.success) return valid;
  const { id, ...data } = valid.data;
  const res = await prisma.fermentationStep.create({
    data,
    include: {
      FermentationProfile: {
        select: {
          name: true,
          slug: true,
          id: true,
        },
      },
    },
  });
  redirect(`/profiles/fermentation/${res?.FermentationProfile?.slug}/edit`);
};

export const updateFermentationStep = async (prev: any, formData: FormData) => {
  const valid = validateSchema(formData, fermentationStepSchema);
  if (!valid.success) return valid;
  const { id, ...data } = valid.data;
  const res = await prisma.fermentationStep.update({
    where: { id },
    data,
    include: {
      FermentationProfile: {
        select: {
          name: true,
          slug: true,
          id: true,
        },
      },
    },
  });
  redirect(`/profiles/fermentation/${res?.FermentationProfile?.slug}/edit`);
};
export const updateFermentationProfile = async (
  prev: any,
  formData: FormData,
) => {
  const valid = validateSchema(formData, fermentationSchema);

  if (valid.errors) return valid;
  const { id, userId, forkedFrom, ...rest } =
    valid.data || ({} as FermentationProfile);
  const res = await prisma.fermentationProfile.update({
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

  redirect(`/profiles/fermentation/${res.slug}`);
};

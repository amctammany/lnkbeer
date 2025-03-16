"use server";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import {
  FermentationProfileSchema,
  FermentationStepSchema,
} from "@/schemas/fermentationProfileSchema";
import { ExtendedFermentationStep } from "@/types/Profile";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";

export const createFermentationProfile = async (
  data: FermentationProfileSchema,
) => {
  const { id, userId, forkedFrom, ...rest } = data;
  const res = await prisma.fermentationProfile.create({
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

export const createFermentationStep = async (data: FermentationStepSchema) => {
  const { id, fermentationProfileId, ...rest } = data;
  const res = await prisma.fermentationStep.create({
    data: { ...rest, fermentationProfileId: fermentationProfileId! },
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

export const updateFermentationStep = async (data: FermentationStepSchema) => {
  const { id, ...rest } = data;
  const res = await prisma.fermentationStep.update({
    where: { id: id! },
    data: rest,
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
  data: FermentationProfileSchema,
) => {
  const { id, userId, forkedFrom, ...rest } = data;
  const res = await prisma.fermentationProfile.update({
    where: { id: id! },
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

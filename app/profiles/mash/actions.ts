"use server";
import { prisma } from "@/lib/client";
import slugify from "@/lib/slugify";
import { validateSchema } from "@/lib/validateSchema";
import { MashProfileSchema, MashStepSchema } from "@/schemas/mashProfileSchema";
import {
  ExtendedMashStep,
  MashProfileInput,
  MashStepInput,
} from "@/types/Profile";
import { MashProfile, MashStepType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";

export const createMashProfile = async (data: MashProfileSchema) => {
  const { id, userId, forkedFrom, ...rest } = data;
  const res = await prisma.mashProfile.create({
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
  redirect(`/profiles/mash/${res.slug}`);
};
export const removeMashStep = async (src: ExtendedMashStep) => {
  const res = await prisma.mashStep.delete({
    where: {
      id: src.id,
    },
    include: {
      MashProfile: true,
    },
  });
  await prisma.mashStep.updateMany({
    where: {
      mashProfileId: res.mashProfileId,
      rank: { gte: res.rank + 1 },
    },
    data: {
      rank: { decrement: 1 },
    },
  });
  revalidatePath(`/profiles/mash/${src?.MashProfile?.slug}/edit`);
};
export const duplicateMashStep = async (src: ExtendedMashStep) => {
  const { id, MashProfile, ...data } = src;
  await prisma.mashStep.updateMany({
    where: {
      mashProfileId: src.mashProfileId,
      rank: { gte: src.rank + 1 },
    },
    data: {
      rank: { increment: 1 },
    },
  });
  const res = await prisma.mashStep.create({
    data: { ...data, rank: src.rank + 1 },
  });
  revalidatePath(`/profiles/mash/${src?.MashProfile?.slug}/edit`);
};
export const shiftMashStep = async (dir: -1 | 1, src: ExtendedMashStep) => {
  if (
    src.rank + dir >= 0 ||
    src.rank + dir <= src.MashProfile.steps.length - 1
  ) {
    const other = await prisma.mashStep.updateMany({
      where: {
        mashProfileId: src.mashProfileId!,
        rank: src.rank + dir,
      },
      data: {
        rank: src.rank,
      },
    });
    if (other.count === 1) {
      const res = await prisma.mashStep.update({
        where: { id: src.id },
        data: { rank: src.rank + dir },
        include: {
          MashProfile: {
            select: {
              slug: true,
              steps: true,
            },
          },
        },
      });
      revalidatePath(`/profiles/mash/${src?.MashProfile?.slug}/edit`);
    }
  }
};
const removeSchema = zfd.formData({
  slug: zfd.text(),
});
export async function removeMashProfile(formData: FormData) {
  const { slug } = removeSchema.parse(formData);
  await prisma.mashProfile.delete({
    where: { slug },
  });
  revalidatePath("/profiles/mash");
}

export const createMashStep = async (data: MashStepSchema) => {
  const { id, mashProfileId, ...rest } = data;
  const res = await prisma.mashStep.create({
    data: { ...rest },
    include: {
      MashProfile: {
        select: {
          name: true,
          slug: true,
          id: true,
        },
      },
    },
  });
  redirect(`/profiles/mash/${res?.MashProfile?.slug}/edit`);
};

export const updateMashStep = async (data: MashStepSchema) => {
  const { id, mashProfileId, ...rest } = data;
  const res = await prisma.mashStep.update({
    where: { id: id! },
    data: rest,
    include: {
      MashProfile: {
        select: {
          name: true,
          slug: true,
          id: true,
        },
      },
    },
  });
  redirect(`/profiles/mash/${res?.MashProfile?.slug}/edit`);
};
export const updateMashProfile = async (data: MashProfileSchema) => {
  const { id, userId, forkedFrom, ...rest } = data; //|| ({} as MashProfile);
  const res = await prisma.mashProfile.update({
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

  redirect(`/profiles/mash/${res.slug}`);
};

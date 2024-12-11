"use server";
import { prisma } from "@/lib/client";
import { validateSchema } from "@/lib/validateSchema";
import { ExtendedMashStep } from "@/types/Profile";
import { MashProfile, MashStepType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { zfd } from "zod-form-data";

const mashStepSchema = zfd.formData({
  id: zfd.text(z.string().optional()),
  mashProfileId: zfd.text(z.string().optional()),
  rank: zfd.numeric(z.number().min(0)),
  name: zfd.text(z.string().optional()),
  type: z.nativeEnum(MashStepType).default(MashStepType.temperature),
  rampTime: zfd.numeric(z.number().optional()),
  time: zfd.numeric(z.number()),
  temperature: zfd.numeric(z.number()),
});
const mashSchema = zfd.formData({
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

export const createMashProfile = async (prev: any, formData: FormData) => {
  const valid = validateSchema(formData, mashSchema);
  if (!valid.success) return valid;

  const { id, userId, forkedFrom, ...data } = valid.data;
  const res = await prisma.mashProfile.create({
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
  //console.log(res);
  redirect(
    `/profiles/mash/${res.MashProfile?.slug}/edit`,
    RedirectType.replace,
  );
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
  //console.log(res);
  redirect(`/profiles/mash/${MashProfile?.slug}/edit`, RedirectType.replace);

  //retuasync rn;
  //const valid = validateSchema(formData, mashStepSchema);
  //console.log(valid);
  //const f = await Promise.resolve();
  //const valid = validateSchema(formData, mashStepSchema);
  //if (!valid.success) return;
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
      console.log(other, res);
      //return res.MashProfile;
      revalidatePath(`/profiles/mash/${src?.MashProfile?.slug}/edit`);
      //redirect(
      //`/profiles/mash/${res?.MashProfile?.slug}/edit`,
      //RedirectType.replace,
      //);
    }
  }
};
export const createMashStep = async (prev: any, formData: FormData) => {
  const valid = validateSchema(formData, mashStepSchema);
  if (!valid.success) return valid;
  const { id, ...data } = valid.data;
  const res = await prisma.mashStep.create({
    data,
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

export const updateMashStep = async (prev: any, formData: FormData) => {
  const valid = validateSchema(formData, mashStepSchema);
  if (!valid.success) return valid;
  const { id, ...data } = valid.data;
  const res = await prisma.mashStep.update({
    where: { id },
    data,
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
export const updateMashProfile = async (prev: any, formData: FormData) => {
  //console.log(prev, formData.entries());
  const valid = validateSchema(formData, mashSchema);

  if (valid.errors) return valid;
  const { id, userId, forkedFrom, ...rest } = valid.data || ({} as MashProfile);
  const res = await prisma.mashProfile.update({
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

  redirect(`/profiles/mash/${res.slug}`);
};

"use server";
import { prisma } from "@/lib/client";
import { validateSchema } from "@/lib/validateSchema";
import { MashProfile, MashStepType } from "@prisma/client";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { zfd } from "zod-form-data";

const mashStepSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  name: zfd.text(z.string().optional()),
  type: z.nativeEnum(MashStepType).default(MashStepType.temperature),
  rampTime: zfd.numeric(z.number().optional()),
  time: zfd.numeric(z.number().optional()),
  temperature: zfd.numeric(z.number().optional()),
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

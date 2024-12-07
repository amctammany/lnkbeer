import { prisma } from "@/lib/client";
import { ExtendedMashProfile, ExtendedMashStep } from "@/types/Profile";
import { cache } from "react";

export const getMashStep = cache(async (id: number) => {
  const step = await prisma.mashStep.findFirst({
    where: { id: { equals: id } },
    include: {
      MashProfile: {
        select: {
          name: true,
          slug: true,
          steps: true,
        },
      },
    },
  });
  return step;
});

export const getMashProfile = cache(async (slug: string) => {
  const profile = await prisma.mashProfile.findFirst({
    where: { slug: { equals: slug } },
    include: {
      owner: true,
      origin: true,
      steps: true,
    },
  });
  return profile as ExtendedMashProfile;
});

export const getMashProfiles = cache(async () => {
  const profiles = await prisma.mashProfile.findMany({});
  return profiles;
});

export const getMashProfileOptions = async () => {
  const profiles = await getMashProfiles();
  const options = profiles.reduce(
    (acc, profile) => {
      acc[profile.id] = `${profile.name}`;
      return acc;
    },
    {} as Record<string, string>,
  );
  return options;
};

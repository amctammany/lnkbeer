import { prisma } from "@/lib/client";
import {
  ExtendedFermentationProfile,
  ExtendedFermentationStep,
} from "@/types/Profile";
import { cache } from "react";

export const getFermentationStep = cache(async (id: string) => {
  const step = await prisma.fermentationStep.findFirst({
    where: { id: { equals: id } },
    include: {
      FermentationProfile: {
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

export const getFermentationProfile = cache(async (slug: string) => {
  const profile = await prisma.fermentationProfile.findFirst({
    where: { slug: { equals: slug } },
    include: {
      owner: true,
      origin: true,
      forks: { select: { id: true } },
      steps: {
        orderBy: { rank: "asc" },

        select: {
          id: true,
          FermentationProfile: { select: { slug: true, name: true, id: true } },
          fermentationProfileId: true,
          name: true,
          temperature: true,
          time: true,
          type: true,
          rampTime: true,
          rank: true,
        },
      },
    },
  });
  return profile as ExtendedFermentationProfile;
});

export const getFermentationProfiles = cache(async () => {
  const profiles = await prisma.fermentationProfile.findMany({});
  return profiles;
});

export const getFermentationProfileOptions = async () => {
  const profiles = await getFermentationProfiles();
  const options = profiles.reduce(
    (acc, profile) => {
      acc[profile.id] = `${profile.name}`;
      return acc;
    },
    {} as Record<string, string>,
  );
  return options;
};

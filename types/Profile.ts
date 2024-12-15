import {
  EquipmentProfile,
  FermentationProfile,
  FermentationStep,
  MashProfile,
  MashStep,
  WaterProfile,
} from "@prisma/client";
import { BaseUser } from "./User";
import { FermentableSummaryTabProps } from "@/app/ingredients/fermentables/_components/FermentableDisplay/FermentableSummaryTab";

export type ExtendedWaterProfile = WaterProfile & {
  //id?: number;
  owner?: BaseUser;
  origin?: WaterProfile;
  forks: Pick<ExtendedWaterProfile, "id">[];
};
export type ExtendedEquipmentProfile = EquipmentProfile & {
  //id?: number;
  owner?: BaseUser;
  origin?: EquipmentProfile;
  forks: Pick<ExtendedEquipmentProfile, "id">[];
};
export type ExtendedFermentationProfile = FermentationProfile & {
  owner?: BaseUser;
  steps: FermentationStep[];
  origin?: FermentationProfile;
  forks: Pick<ExtendedMashProfile, "id">[];
};
export type ExtendedFermentationStep = FermentationStep & {
  FermentationProfile: FermentationProfile & { steps: { id: string }[] };
};

export type ExtendedMashProfile = MashProfile & {
  owner?: BaseUser;
  steps: MashStep[];
  origin?: MashProfile;
  forks: Pick<ExtendedMashProfile, "id">[];
};
export type ExtendedMashStep = MashStep & {
  MashProfile: MashProfile & { steps: { id: string }[] };
};

export type WaterProfileInput = Omit<WaterProfile, "id"> & {
  id?: string;
};
export type EquipmentProfileInput = Omit<EquipmentProfile, "id"> & {
  id?: string;
};
export type MashProfileInput = Omit<MashProfile, "id"> & {
  id?: string;
  steps: Omit<MashStep, "id" | "userId" | "mashProfileId">[];
};
export type MashStepInput = Omit<MashStep, "id"> & {
  id?: string;
  MashProfile: Partial<MashProfile>;
  //steps: Omit<MashStep, "id" | "userId" | "mashProfileId">[];
};
export type FermentationProfileInput = Omit<FermentationProfile, "id"> & {
  id?: string;
  steps: Omit<
    FermentableSummaryTabProps,
    "id" | "userId" | "fermentationProfileId"
  >[];
};
export type FermentationStepInput = Omit<FermentationStep, "id"> & {
  id?: string;
  FermentationProfile: Partial<FermentationProfile>;
  //steps: Omit<MashStep, "id" | "userId" | "mashProfileId">[];
};

import {
  EquipmentProfile,
  MashProfile,
  MashStep,
  WaterProfile,
} from "@prisma/client";
import { BaseUser } from "./User";

export type ExtendedWaterProfile = WaterProfile & {
  //id?: number;
  owner?: BaseUser;
  origin?: WaterProfile;
};
export type ExtendedEquipmentProfile = EquipmentProfile & {
  //id?: number;
  owner?: BaseUser;
  origin?: EquipmentProfile;
};
export type ExtendedMashProfile = MashProfile & {
  owner?: BaseUser;
  steps: MashStep[];
  origin?: MashProfile;
};
export type ExtendedMashStep = MashStep & {
  MashProfile: MashProfile & { steps: { id: number }[] };
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
  id?: number;
  MashProfile: Partial<MashProfile>;
  //steps: Omit<MashStep, "id" | "userId" | "mashProfileId">[];
};

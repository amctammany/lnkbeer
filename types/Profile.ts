import { EquipmentProfile, WaterProfile } from "@prisma/client";
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
export type WaterProfileInput = Omit<WaterProfile, "id"> & {
  id?: string;
};
export type EquipmentProfileInput = Omit<EquipmentProfile, "id"> & {
  id?: string;
};

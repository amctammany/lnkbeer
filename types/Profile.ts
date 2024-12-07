import { WaterProfile } from "@prisma/client";
import { BaseUser } from "./User";

export type ExtendedWaterProfile = WaterProfile & {
  //id?: number;
  owner?: BaseUser;
  origin?: WaterProfile;
};

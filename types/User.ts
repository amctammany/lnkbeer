import { HopSensoryPanel, User } from "@prisma/client";

export type BaseUser = Pick<User, "name" | "email" | "id">;
export type ExtendedUser = User & {
  hopSensoryPanels: HopSensoryPanel[];
};

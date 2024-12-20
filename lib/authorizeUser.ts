import { auth } from "@/app/auth";
import { User } from "next-auth";

interface OwnedResource {
  userId?: string;
  owner?: User;
}
export async function authorizeUser<T extends object>(resource: T, user: User) {
  const session = await auth();
  console.log(resource, user, session);
  return await Promise.resolve(resource);
}

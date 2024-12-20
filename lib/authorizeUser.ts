import { auth } from "@/app/auth";
import { User } from "next-auth";
import { forbidden, unauthorized } from "next/navigation";

interface OwnedResource {
  userId?: string;
  owner?: User;
}
export async function authorizeResource<T extends object>(fn, ...args) {
  const session = await auth();
  if (!session?.user) return unauthorized();
  //if (session?.role !== "SUPERUSER") return forbidden();
  const resource = await fn(...args);
  if (session?.role === "SUPERUSER") return resource;
  if (resource.userId && resource.userId !== session.user.id)
    return unauthorized();
  return resource;
}
export async function authorizeUser<T extends object>(resource: T, user: User) {
  const session = await auth();
  console.log(resource, user, session);
  return await Promise.resolve(resource);
}

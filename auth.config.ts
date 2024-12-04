import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/client";

export const authConfig = {
  secret: "secret",
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  //callbacks: {},
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      const currentUser = await prisma.user.findFirst({
        where: {
          id: token.id as string,
        },
      });
      if (currentUser) {
        token.user = currentUser;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

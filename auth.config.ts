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
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      //session.accessToken = token.accessToken;
      session.user = token.user as any;
      session.user.id = token.id as any;

      return session;
    },
    async jwt({ token, user, account, profile }) {
      console.log({ profile, token, user, account });
      const currentUser = await prisma.user.findFirst({
        where: {
          id: token.sub,
        },
      });
      //session.user.username = (token.user as any).username;
      if (currentUser) {
        token.user = currentUser;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

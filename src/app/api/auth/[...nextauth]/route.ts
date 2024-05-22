import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Email from "next-auth/providers/email"

const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET

const googleId = process.env.GOOGLE_CLIENT_ID
const googleSecret = process.env.GOOGLE_CLIENT_SECRET

if (!githubId || !githubSecret || !googleId || !googleSecret) {
  throw new Error('Variable d\environnement manquante')
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret!,
    }),
    GoogleProvider({
      clientId: googleId!,
      clientSecret: googleSecret!
    }),
    Email({
      from: process.env.EMAIL_FROM,
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
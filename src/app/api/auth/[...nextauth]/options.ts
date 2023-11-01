import type { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { randomBytes, randomUUID } from "crypto";
import { SERVER_BASE_URL } from "@/config";

export const authOptions: NextAuthOptions = {
  providers: [
    // GitHubProvider({
    //     clientId: process.env.GITHUB_ID as string,
    //     clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    CredentialsProvider({
      type: "credentials",
      id: 'credentials',
      name: 'credentials',
      credentials: {
        username: {
          label: "Phone number:",
          type: "tel",
          placeholder: "Enter your phone number",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const { phoneNumber, password } = credentials as any;

        //AUTO LOGIN FORM

        const res = await fetch(`${SERVER_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber, password }),
        });
        const user : any = res.json();
        if (res.ok && user) {
          return user;
        } else return null;

        // CUSTOM LOGIN FORM

        // const res = await fetch("http://127.0.0.1:3000/api/auth/login", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ phoneNumber, password }),
        // });

        // const user : any = res.json();

        // if (res.ok && user) {
        //   return user;
        // } else return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60, //3hrs
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token }: { session: Session; token: any }) {
			return { ...session, user: token };
		},
	},

  pages: { signIn: `/auth/login` },
};

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `auth`, contains cross-site information
   */
  interface Session {
    user: {
      /** The user's role. */
      role: string;
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}

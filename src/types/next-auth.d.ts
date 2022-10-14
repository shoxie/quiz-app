import NextAuth from "next-auth";

type User = {
  id: string;
  name: string
};

declare module "next-auth" {
  interface User {
    id: string;
  name: string
  }

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: User;
  }
}
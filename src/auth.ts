import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { sendRequest } from "./lib/api";
import { InactiveAccountError, InvalidEmailPasswordError } from "./lib/error";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(credentials);
        // const res = await sendRequest<IBackendRes<ILogin>>({
        //   method: "POST",
        //   url: "http://localhost:3001/auth/login",
        //   body: {
        //     email: credentials.email,
        //     password: credentials.password,
        //   },
        // });
        // if (res.statusCode === 201) {
        //   return {
        //     _id: res.data?.user?.id,
        //     name: res.data?.user?.name,
        //     email: res.data?.user?.email,
        //     role: res.data?.user?.role,
        //     access_token: res.data?.user?.access_token,
        //     refresh_token: res.data?.user?.refresh_token,
        //   };
        // } else if (+res.statusCode === 401) {
        //   throw new InvalidEmailPasswordError();
        // } else if (+res.statusCode === 400) {
        //   throw new InactiveAccountError();
        // } else {
        //   throw new Error("Internal server error");
        // }
        return {
          id: "12345",
          name: "John Doe",
          email: "john.doe@example.com",
          role: "admin",
          token: "some-jwt-token",
          accessToken: "some-access-token",
          refreshToken: "some-refresh-token",
        };
      },
    }),
  ],
  pages: {
    signIn: "/SignIn",
    newUser  :"/SignUp"
  },
  callbacks: {
    jwt({ token, user }) {
      console.log(token);
      if (user) {
        token.user = user ;
      }
      return token;
    },
    session({ session, token }) {
      console.log("token", token);
      session.user= token.user;
      console.log("my session", session);
      return session;
    },
  },
});

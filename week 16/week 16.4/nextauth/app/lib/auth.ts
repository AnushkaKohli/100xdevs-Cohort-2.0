import CredentialsProvider from "next-auth/providers/credentials";

export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      // name is the name that shows in the button "Sign in with email"
      name: "Email",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "•••••••",
        },
      },
      async authorize(credentials: any) {
        // authorize function contains the logic to login
        // credentials contains all the variables that you defined in credentials object
        console.log("credentials: ", credentials);
        return {
          id: "user1",
          name: "Anushka",
          email: credentials.username,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({ token, user }) => {
      console.log("TTToken: ", token);
      if (user) {
        console.log("UUUser: ", user);
        token.uid = user.id;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      if (session && session.user) session.user.uid = token.uid;
      return session;
    },
  },
  // to prevent redirection to the nextauth-made signin page (or fallbacks to that page in case of failure), we explicitly add our own signin page
  pages: {
    signIn: "/signin",
  },
};

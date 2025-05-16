import NextAuth, { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";

interface Credentials {
  email?: string;
  password?: string;
  token?: string;
}

interface Token extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  error?: string;
}

interface UserWithTokens extends User {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "token" },
      },
      async authorize(
        credentials?: Credentials
      ): Promise<UserWithTokens | null> {
        if (!credentials) return null;

        let authCredentials;

        if (
          credentials.token &&
          credentials.token === process.env.GUEST_AUTH_TOKEN
        ) {
          authCredentials = {
            email: process.env.GUEST_AUTH_EMAIL,
            password: process.env.GUEST_AUTH_PASSWORD,
          };
        } else {
          authCredentials = {
            email: credentials.email,
            password: credentials.password,
          };
        }

        try {
          const response = await axios.post(
            `${process.env.BACKEND_URL}/auth/login`,
            authCredentials,
            {
              headers: {
                "x-client-api-key": process.env.CLIENT_API_KEY,
              },
            }
          );

          const result = response.data?.data;

          if (result && response.status === 201) {
            return {
              ...result.user,
              accessToken: result.access_token,
              // refreshToken: result.refresh_token,
              // accessTokenExpires: Date.now() + result.expires_in * 1000,
            };
          }
        } catch (error) {
          return null;
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User; account?: any }) {
      if (user) {
        const isUserWithTokens = (user: User): user is UserWithTokens =>
          (user as UserWithTokens).accessToken !== undefined;

        if (isUserWithTokens(user)) {
          return {
            accessToken: user.accessToken,
            // refreshToken: user.refreshToken,
            // accessTokenExpires: user.accessTokenExpires,
          };
        }
      }

      // if (
      //   (token as Token).accessToken &&
      //   Date.now() < (token as Token).accessTokenExpires
      // ) {
      // return token;
      // }

      // return refreshAccessToken(token as Token);

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT | Token;
    }): Promise<Session> {
      const tokenWithAccess = token as Token;
      session.accessToken = tokenWithAccess.accessToken;
      (session as any).error = tokenWithAccess.error;

      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  debug: process.env.NODE_ENV === "development",
};

async function refreshAccessToken(token: Token): Promise<Token> {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/auth/refresh`,
      {
        refresh_token: token.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
          "x-client-api-key": process.env.CLIENT_API_KEY,
        },
      }
    );

    const refreshedTokens = response.data.data;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      // accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      // refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

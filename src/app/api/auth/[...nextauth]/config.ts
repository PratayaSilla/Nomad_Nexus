import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import { connectToDatabase } from "@/server/db/db";
import GoogleProvider from "next-auth/providers/google";
import { User, IUser } from "@/server/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "passsword" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email or passsword is missing!");
        }
        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email }) as IUser
          if (!user) {
            throw new Error("No exisiting user found!");
          }

          const isValid = await user.isPasswordCorrect(credentials.password)
          if (!isValid) {
            throw new Error("Invalid password !");
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          throw new Error((error as Error).message);
        }
      },
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
      })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
    
      const user = await User.findOne({email : profile?.email || token?.email});
      if (account && profile) {
        if (!user) {
          type FacebookProfile = { picture?: { data?: { url?: string } }, email: string, name: string };
          type GoogleProfile = { picture?: string, email: string, name: string };
          const fbProfile = profile as FacebookProfile;
          const googleProfile = profile as GoogleProfile;
          await User.create({ fullName: profile.name, 
                              email : profile.email,
                              provider : account.provider,
                              avatar: fbProfile.picture?.data?.url || googleProfile.picture || undefined })
                                
        }
      }

      token.user = { sub: user._id, email: user.email };
      
      return token;
    },
    async session({ session, token }) {
      const user = await User.findById(token.sub).select('_id email fullName username avatar isVerified');
      session.user = user
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
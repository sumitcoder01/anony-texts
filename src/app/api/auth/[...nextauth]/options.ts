import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import { createUserName } from '@/lib/generateUsername';


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email/Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error('No user found with this email/username');
          }
          if (!user.isVerified) {
            throw new Error('Please verify your account before logging in');
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          throw new Error(err.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account && profile && account.provider === "google") {
        await dbConnect();
        const email = profile?.email || "";
        let user = await UserModel.findOne({ email });
        if (!user) {
          const username = createUserName(email)
          user = new UserModel({
            username,
            email,
            isVerified: true,
            verifyCode: Math.floor(100000 + Math.random() * 900000).toString(),
            verifyCodeExpiry: Date.now(),
            isGoogleAccount: true
          });
          await user.save();
        }
      }
      return true;
    },
    async jwt({ token, user , trigger , session }) {
      if(trigger === "update"){
        return {...token , ...session.user};
      }
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
        token.isGoogleAccount = user.isGoogleAccount;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
        session.user.createdAt = token.createdAt;
        session.user.updatedAt = token.updatedAt;
        session.user.isGoogleAccount = token.isGoogleAccount;
        session.user.email = token.email;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

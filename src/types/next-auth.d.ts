import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
      createdAt?: Date;
      updatedAt?: Date;
      isGoogleAccount?:boolean;
    } & DefaultSession['user'];
  }

  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isGoogleAccount?:boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isGoogleAccount?:boolean;
  }
}
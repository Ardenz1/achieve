import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/database/client";  

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Find user in the database
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        // Check if the user exists and if the password is correct
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user.id, username: user.username };  // Return user data (customize as needed)
        }
        return null;  // Return null if user doesn't exist or password is incorrect
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',  // Customize the sign-in page URL if you want
  },
  session: {
    strategy: "jwt",  // Use JWT for session management
  },
  secret: process.env.NEXTAUTH_SECRET,  // Make sure to set this in your environment variables
};

export default NextAuth(authOptions);

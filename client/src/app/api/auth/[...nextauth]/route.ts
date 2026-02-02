import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { loginWithGoogleService } from "@/services/auth.service"

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user) {
        try {
          await loginWithGoogleService({
            name: user.name || "",
            email: user.email || "",
            image: user.image || ""
          });
          return true;
        } catch (error) {
          console.error("Google login error:", error);
          return false;
        }
      }
      return true;
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
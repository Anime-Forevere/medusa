import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
        clientId: process.env.DISCORD_OAUTH_CLIENT_ID,
        clientSecret: process.env.DISCORD_OAUTH_CLIENT_SECRET
      })
  ],
  secret: "fdshgfrhfd",
  pages: {
    signIn: "/login"
  },
  callbacks: {
        async jwt({ token, account }) {
          if (account) {
              token.accessToken = account.access_token
          }
          return token
        },
        async session({ session, token, user }) {
          session.user["avatar"] = session.user.image
          delete session.user.image
          session.accessToken = token.accessToken
          return session
        }
    }
})

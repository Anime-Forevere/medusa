import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/db"
import config from "../../../config"
import DiscordProvider from "next-auth/providers/discord"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"

let providers = [];

if (config.providers.discord.enabled) {
	providers.push(
		DiscordProvider({
			clientId: config.providers.discord.client_id,
			clientSecret: config.providers.discord.client_secret
		}),
	)
}


if(config.providers.google.enabled) {
	providers.push(
		GoogleProvider({
			clientId: config.providers.google.client_id,
			clientSecret: config.providers.google.client_secret,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code"
				}
			}
		})
	)
}

if(config.providers.email.enabled) {
	providers.push(
		EmailProvider({
			server: config.providers.email.smtp,
			from: config.providers.email.from
		}),
	)
}

export default NextAuth({
	// Configure one or more authentication providers
	adapter: MongoDBAdapter(clientPromise),
	providers,
	secret: config.secret,
	pages: {
		signIn: "/login"
	},
	callbacks: {
		async jwt({
			token,
			account
		}) {
			if (account) {
				token.accessToken = account.access_token
			}
			return token
		},
		async session({
			session,
			token,
			user
		}) {
			session.user["avatar"] = session.user.image
			delete session.user.image
			session.accessToken = token.accessToken
			return session
		}
	}
})
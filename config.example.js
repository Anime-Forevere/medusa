module.exports = {
    // Put name of your hosting here
    name: "Medusa",
    // You need to paste Mongo DB URI here. Host it on official site or on your own hosting
    db: "",

    // Type random symbols here to make your own secret.
    // It is not recommended to leave it empty
    secret: "",

    // Here you configure ways of signing in
    // Don't forget to allow redirect URI: http://example.com/api/auth/callback/provider
    // Example: For Discord redirect URI is http://example.com/api/auth/callback/discord
    providers: {
        discord: {
            // Enabled or disabled
            // Redirect URI: domain.com/api/auth/callback/discord
            enabled: true,
            // Paste all info from https://discord.dev
            client_id: "",
            client_secret: ""
        },
        google: {
            // Google is not made yet so not recommended to use
            // Same with google
            // Redirect URI: domain.com/google
            enabled: false,
            // You need to add ".../auth/userinfo.email" and "../auth/userinfo.profile" scopes
            client_id: "",
            client_secret: ""
        },
        email: {
            // Email is not made yet so not recommended to use
            enabled: true,
            // You can use your own SMTP server or gmail's one.
            // Gmail is recommended one though
            smtp: "smtp://username:password@smtp.gmail.com:587",
            from: "Medusa | Email verification"
        }
    },

    resources: {
        cpu: 100, // % of CPU given to user as default
        ram: 2048, // MB of RAM given to user as default
        disk: 1024 * 10, // MB of Disk Space given to user as default
        slots: 2
    }
}
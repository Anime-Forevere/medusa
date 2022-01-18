import config from "../config"

function signIn(provider) {
    if(!provider) throw "No provider";
    switch(provider) {
        case "discord": 
            window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${config.providers.discord.client_id}&redirect_uri=${config.domain}%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email`
            break
        case "google":
<<<<<<< Updated upstream
            window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.providers.google.client_id}&redirect_uri=${config.domain}/google&response_type=token&scope=openid%20email%20profile`
=======
            window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.providers.google.client_id}&redirect_uri=${config.domain}/api/auth/callback/google&response_type=token&scope=openid%20email%20profile`
>>>>>>> Stashed changes
            break
    }
}

export default signIn
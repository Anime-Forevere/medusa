import config from "../config"

function signIn(provider) {
    if(!provider) throw "No provider";
    if(provider === "discord") {
        window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${config.providers.discord.client_id}&redirect_uri=${config.domain}%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email`
    }
}

export default signIn
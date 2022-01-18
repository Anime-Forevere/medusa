import config from "../../../../config"
import db from "../../../../lib/db"
import User from "../../../../schemas/User"
import Session from "../../../../schemas/Session"
import { setCookies } from 'cookies-next';

export default async function handler(req, res) {
<<<<<<< Updated upstream
    if(req.query.error || !req.query.access_token) {
        res.writeHead(307, {
            Location: '/login?error=access_denied'
        });
        return res.end();
    }
    
    let data = await fetch(`https://oauth2.googleapis.com/token?code=${req.query.access_token}&client_id=${config.providers.google.client_id}&client_secret=${config.providers.google.client_secret}&grant_type=authorization_code`, {
        method: "POST"
    }).then(res => res.json())
    console.log(data)
    res.status(200).send(data)
=======
    console.log(req)
    res.status(200).send(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.providers.google.client_id}&redirect_uri=${config.domain}/api/auth/callback/google&response_type=token&scope=openid%20email%20profile`)
>>>>>>> Stashed changes
}
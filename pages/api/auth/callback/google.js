import config from "../../../../config"
import db from "../../../../lib/db"
import User from "../../../../schemas/User"
import Session from "../../../../schemas/Session"
import { setCookies } from 'cookies-next';

export default async function handler(req, res) {
    if(req.query.error || !req.query.access_token) {
        res.writeHead(307, {
            Location: '/login?error=access_denied'
        });
        return res.end();
    }
    let data = await fetch(`https://oauth2.googleapis.com/token?grant_type=authorization_code&code=${req.query.access_token}&client_id=${config.providers.google.client_id}&client_secret=${config.providers.google.client_secret}&redirect_uri=${config.domain}/google`, {
        method: "POST"
    }).then(res => res.json())
    console.log(data)
    res.status(200).send({
        code: req.query.access_token,
        client_id: config.providers.google.client_id,
        client_secret: config.providers.google.client_secret,
        redirect_uri: `${config.domain}/google`,
        grant_type: "authorization_code"
    })
}
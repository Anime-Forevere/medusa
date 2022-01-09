import config from "../../../../config"
import db from "../../../../lib/db"
import User from "../../../../schemas/User"
import { URLSearchParams } from 'url'

export default async function handler (req, res) {
    let code = req.query.code
    const params = new URLSearchParams();
    params.append('client_id', config.providers.discord.client_id);
    params.append('client_secret', config.providers.discord.client_secret);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', `${config.domain}/api/auth/callback/discord`);
    params.append('scope', "identify email");
    let auth = await fetch(`https://discord.com/api/oauth2/token`, {
        method: "POST",
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
    }).then(res => res.json())
    code = auth["access_token"]
    let info = await fetch(`https://discord.com/api/v9/users/@me`, {
        headers: {
            Authorization: `Bearer ${code}`
        }
    }).then(res => res.json())
    return res.status(200).send(info)
    await db()
    let user = await User.findOne({id: info.id})
    if(!user || user === null) {
        User.create({
            id: info.id,
            email: info.email,
            avatar: info.avatar ? `https://cdn.discordapp.com/avatars/${info.id}/${info.avatar}.png` : `https://cdn.xyna.space/r/discord.png`
        })
    } else {
        
    }
}
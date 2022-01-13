import config from "../../../../config"
import db from "../../../../lib/db"
import User from "../../../../schemas/User"
import {
    URLSearchParams
} from 'url'
import Session from "../../../../schemas/Session"
import { setCookies } from 'cookies-next';

export default async function handler(req, res) {
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
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
    }).then(res => res.json())
    if(auth.error === "invalid_request") {
        res.writeHead(307, {
            Location: '/login?error=expiredcode'
        });
        return res.end();
    }
    code = auth["access_token"]
    let info = await fetch(`https://discord.com/api/v9/users/@me`, {
        headers: {
            Authorization: `Bearer ${code}`
        }
    }).then(res => res.json())
    await db()
    let user = await User.findOne({
        id: info.id
    })
    if (!user || user === null) {
        user = await User.create({
            id: info.id,
            name: info.username,
            email: info.email,
            avatar: info.avatar ? `https://cdn.discordapp.com/avatars/${info.id}/${info.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${info.discriminator % 5}.png`
        })
    } else {
        user = await User.updateOne({id: info.id}, {
            name: info.username,
            email: info.email,
            avatar: info.avatar ? `https://cdn.discordapp.com/avatars/${info.id}/${info.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${info.discriminator % 5}.png`
        })
    }
    let session = await Session.findOne({
        id: info.id
    })
    let expired = false;
    if (session?.created) {
        if (session.created + 604800000 < Date.now()) expired = true
    }
    if (!session || session === null || expired) {
        if (expired) {
            await Session.deleteOne({
                session: session.session
            })
        }
        let string = await generateSession(32)
        session = await Session.create({
            session: string,
            id: info.id,
            created: Date.now()
        })
    }
    setCookies('session', session.session, { req, res, maxAge: 60 * 60 * 24 * 7 });
    res.writeHead(307, {
        Location: '/dashboard'
    });
    return res.end();
}

async function generateSession(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    let session = await Session.findOne({
        session: result
    })
    if (session !== null || session) return await generateSession(length)
    return result;
}
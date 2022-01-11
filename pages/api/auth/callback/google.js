import config from "../../../../config"
import db from "../../../../lib/db"
import User from "../../../../schemas/User"
import Session from "../../../../schemas/Session"
import { setCookies } from 'cookies-next';

export default async function handler(req, res) {
    console.log(req)
    res.status(200).send(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.providers.google.client_id}&redirect_uri=${config.domain}/api/auth/callback/google&response_type=token&scope=openid%20email%20profile`)
}
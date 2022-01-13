import { getCookie, removeCookies } from 'cookies-next';
import db from "../../../lib/db"
import User from "../../../schemas/User"
import Session from "../../../schemas/Session"

export default async function handler(req, res) {
    if(req.method !== "POST") return res.status(405).send({error: `POST is only supported for this endpoint.`})
    await db()
    console.log(req.body)
    let session = getCookie(`session`, {req,res})
    if(!session) {
        res.writeHead(307, {
            Location: '/login'
        });
        res.end();
    }
    session = await Session.findOne({session})
    if(!session) {
        removeCookies(`session`, {req,res})
        res.writeHead(307, {
            Location: '/login'
        });
        res.end();
    }
    let user = await User.findOne({id: session.id})
    if(!user || user === {}) return res.status(400).send({error: `No user found from active session`})
    let password = req.query.password
    await User.updateOne({id: session.id}, {password})
    user = await User.findOne({id: session.id})
    return res.status(200).send({error: null})
}
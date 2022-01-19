import Session from "../../../schemas/Session"
import { getCookie, removeCookies } from "cookies-next"

export default async function handler(req, res) {
    let session = getCookie("session", {req, res})
    if(!session) {
        res.writeHead(307, {
            Location: '/login'
        });
        return res.end();
    }
    session = await Session.findOne({session})
    if(!session) {
        res.writeHead(307, {
            Location: '/login'
        });
        return res.end();
    }
    removeCookies("session", {req, res})
    await Session.deleteOne({session: session.session})
    res.writeHead(307, {
        Location: '/'
    });
    return res.end();
}
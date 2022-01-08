import db from "../../lib/db"
import User from "../../schemas/User"

export default async function handler (req, res) {
    await db()

    switch(req.method) {
        case "GET":
            if(req.query.id) {
                let user = await User.findOne({id: req.query.id})
                if(!user) return res.status(404).json({error: "User not found."})
                return res.status(200).json({user})
            } else {
                let users = await User.findOne()
                return res.status(200).json({users})
            }
        case "POST":
            if(!req.headers.authorization || req.headers.authorization !== "bruh") return res.status(401).send({error: `Forbidden.`})
            if(req.headers["content-type"] !== "application/json") return res.status(400).send({error: `Invalid content-type. Use "application/json".`})
            let body = req.body
            if(!body.id || !body.email) return res.status(400).send({error: `You forgot to include ID or Email.`})
            if(isNaN(body.id)) return res.status(400).send({error: `ID of user is Not A Number.`})
            return res.status(200).send({id: req.body.id})
        default:
            return res.status(400).send({error: `GET or POST methods are available for this URL.`})
    }
}
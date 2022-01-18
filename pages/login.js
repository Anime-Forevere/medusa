import config from "../config";
import {providers} from "../config"
import signIn from "../lib/signIn"
import { getCookie } from 'cookies-next';
import Session from "../schemas/Session"
import { SiDiscord } from "react-icons/si";

let Login = ({props}) => {
    let query = props
    if(query.error) {
        switch(query.error) {
            case "expiredsession":
                query["error"] = "Your session expired. Login again."
            default:
                query["error"] = "Unknown error."
        }
    }
    return (
        <section className="min-h-screen flex items-stretch text-white ">
            
            <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style={{backgroundImage: "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)"}}>
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="w-full px-24 z-10">
                    <h1 className="text-5xl font-bold text-left tracking-wide">Login</h1>
                    <p className="text-3xl my-4">Login to your account to access our hosting.</p>
                </div>
            </div>
            <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" style={{backgroundColor: "#161616"}}>
                <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style={{backgroundImage: "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)"}}>
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                </div>
                <div className="w-full py-6 z-20">
                    <h1 className="text-5xl text-purple-500">
                        {config.name}
                    </h1>
                    <h1 className="text-10 text-red-500">
                        {query?.error ? query?.error : undefined}
                    </h1>
                    <div className="py-6 space-x-2">
                        <span onClick={() => signIn("discord")} className={"w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white cursor-pointer"}><SiDiscord size={24} /></span>
                    </div>
                    {providers?.email?.enabled && <p className="text-gray-100">
                        or use email
                    </p>}
                    {providers?.email?.enabled && <form action="/api/auth/signin/email" method="POST" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                        <div className="pb-2 pt-4">
                            <input type="email" name="email" id="email" placeholder="Email" className="block w-full p-4 text-lg rounded-sm bg-black" />
                        </div>
                        <div className="px-4 pb-2 pt-4">
                            <button type="submit" className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">sign in</button>
                        </div>
                    </form>}
                </div>
            </div>
        </section>
    )
}



Login.getInitialProps = async({req, res, query}) => {
    let session = getCookie(`session`, {req,res})
    session = await Session.findOne({session})
    if(session) {
        res.writeHead(307, {
            Location: '/dashboard'
        });
        res.end();
    }
    return {props: query}
}


export default Login
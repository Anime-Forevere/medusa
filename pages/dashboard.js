import Navbar from "../components/navbar"
import styles from "../styles/dashboard.module.css"
import db from "../lib/db"
import User from "../schemas/User"
import Session from "../schemas/Session"
import SweetAlert from "react-bootstrap-sweetalert";
import { getCookie } from 'cookies-next';
import React from "react"
import { BsFillCpuFill, BsServer, BsHouseDoorFill } from "react-icons/bs";
import { FaMemory } from "react-icons/fa";
import { RiHardDrive2Fill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react"

let page = ({props}) => {
    let user = props.user
    let password = props.password

    const [navToggle, setNavToggle] = useState(false);

    async function submitPassword() {
        let password = document.getElementById("newPassword").value
        if(!password) {
            let text = document.getElementById("errorText")
            text.innerText = "You didn't enter the password."
            return setTimeout(function(){
                text.innerText = ""
            }, 5000)
        }
        if(password.length < 4) {
            let text = document.getElementById("errorText")
            text.innerText = "Password should contain at least 4 characters."
            return setTimeout(function(){
                text.innerText = ""
            }, 5000)
        }
        if(password.length > 20) {
            let text = document.getElementById("errorText")
            text.innerText = "Password should be shorter than 20 characters."
            return setTimeout(function(){
                text.innerText = ""
            }, 5000)
        }
        let res = await fetch(`/api/auth/password?password=${password}`, {
            method: "POST",
        })
        if(res.status !== 200) {
            let text = document.getElementById("errorText")
            text.innerText = `Request failed with status ${res.status}.`
            return setTimeout(function(){
                text.innerText = ""
            }, 5000)
        }
        window.location.reload()
    }
    return (
        <div className={styles.container}>
            {!password && <SweetAlert info title="Good job!" style={{backgroundColor: "#0E1422", color: "white"}} customButtons={
                <React.Fragment>
                    <button type="button" onClick={() => submitPassword()} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Confirm</button>
                </React.Fragment>
            }>
                Your account has been created!<br />
                Enter your password for panel.<br />
                <strong>Don't use your password from any account!</strong><br />
                <text className="text-red-600" id="errorText"></text><br /><br />
                <div>
                    <input style={{display: "table", margin: "auto", color: "white", border: "none", backgroundColor: "#27274e"}} id="newPassword" type="password" name="password" placeholder="Password" className="py-2 px-3 border w-96 border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block" />
                </div>
                </SweetAlert>}
            <div>
                <Navbar user={user} nav={false} />
                <div className="absolute left-48">
                <div className="sm:grid block grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
                    <div style={{width: "20vw"}} className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <BsFillCpuFill size={64} />
                        <div className="text-right">
                            <p className="text-2xl">{user.used.cpu}/{user.resources.cpu}%</p>
                            <p>CPU</p>
                        </div>
                    </div>
                    <div style={{width: "20vw"}} className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <FaMemory size={64} />
                        <div className="text-right">
                            <p className="text-2xl">{user.used.ram}/{user.resources.ram} MB</p>
                            <p>Memory (RAM)</p>
                        </div>
                    </div>
                    <div style={{width: "20vw"}} className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        < RiHardDrive2Fill size={64} />
                        <div className="text-right">
                            <p className="text-2xl">{user.used.disk}/{user.resources.disk} MB</p>
                            <p>Disk Space</p>
                        </div>
                    </div>
                    <div style={{width: "20vw"}} className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <BsServer size={64} />
                        <div className="text-right">
                            <p className="text-2xl">{user.used.slots}/{user.resources.slots} servers</p>
                            <p>Slots</p>
                        </div>
                    </div>
                    </div>
                </div>
                <nav>
                    {!navToggle && <div style={{backgroundColor: "rgb(17, 24, 39)"}} className={styles.sidebar}>
                        <div>
                            <button style={{position: "absolute", top: 85, left: 15, userSelect: "none"}} onClick={() => setNavToggle(!navToggle)}>
                                {!navToggle && <GiHamburgerMenu size={48} color="white"/>}
                            </button>
                            <button style={{position: "absolute", top: 220, left: 15}}>
                                <BsHouseDoorFill size={48} color="white" />
                            </button>
                        </div>
                    </div>}
                    {navToggle && <div style={{backgroundColor: "rgb(17, 24, 39)"}}  className={styles.opensidebar}>
                        <h1 style={{color: "white", position: "absolute", top: 220, left: 15, fontSize: 16}}>go away</h1>
                    </div>}
                </nav>
            </div>
        </div>
    )
}

page.getInitialProps = async({req, res, query}) => {
    let session = getCookie('session', { req, res })
    if(!session) {
        res.writeHead(307, {
            Location: '/login'
        });
        return res.end();
    }
    await db()
    session = await Session.findOne({session})
    if(!session?.created) {
        res.writeHead(307, {
            Location: '/login'
        });
        return res.end();
    }
    if (session?.created + 604800000 < Date.now()) {
        await Session.deleteOne({id})
        res.writeHead(307, {
            Location: '/login?error=expiredsession'
        });
        return res.end();
    }
    let user = await User.findOne({id: session.id})
    if(!user?.email) {
        res.writeHead(307, {
            Location: '/login'
        });
        return res.end();
    }
    let password = true
    if(!user?.password) password = false 
    return {props: {user, password}}
}

export default page
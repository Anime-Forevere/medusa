import Head from "next/head"
import Navbar from "../components/navbar"
import styles from "../styles/dashboard.module.css"
import config from "../config"
import db from "../lib/db"
import User from "../schemas/User"
import Session from "../schemas/Session"
import SweetAlert from "react-bootstrap-sweetalert";
import { getCookie } from 'cookies-next';
import React from "react"

let page = ({props}) => {
    let user = props.user
    let password = props.password

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
        let res = await fetch(`${config.domain}/api/auth/password?password=${password}`, {
            method: "POST",
        })
        console.log(res)
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
        <div className="bg-[#212f4d]">
            {!password && <SweetAlert info title="Good job!" style={{backgroundColor: "#0E1422", color: "white"}} customButtons={
                <React.Fragment>
                    <button type="button" onClick={() => submitPassword()} class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Confirm</button>
                </React.Fragment>
            }>
                Your account has been created!<br />
                Enter your password for panel.<br />
                <strong>Don't use your password from any account!</strong><br />
                <text className="text-red-600" id="errorText"></text><br /><br />
                <div>
                    <input style={{display: "table", margin: "auto", color: "white", border: "none", backgroundColor: "#27274e"}} id="newPassword" type="password" name="password" placeholder="Password" class="py-2 px-3 border w-96 border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block" />
                </div>
                </SweetAlert>}
            <Head>
                <script src="https://kit.fontawesome.com/e8588d4c11.js" crossOrigin="anonymous" />
            </Head>
            <div>
                <Navbar user={user} nav={false} />
                <div className="absolute left-48">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
                    <div class="2xl:w-96 bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                            <i className="" />
                        </div>
                        <div class="text-right">
                            <p class="text-2xl">{user.used.cpu}/{user.resources.cpu}%</p>
                            <p>CPU</p>
                        </div>
                    </div>
                    <div class="2xl:w-96 bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                            <i className="" />
                        </div>
                        <div class="text-right">
                            <p class="text-2xl">{user.used.ram}/{user.resources.ram} MB</p>
                            <p>Memory (RAM)</p>
                        </div>
                    </div>
                    <div class="2xl:w-96 bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                            <i className="" />
                        </div>
                        <div class="text-right">
                            <p class="text-2xl">{user.used.disk}/{user.resources.disk} MB</p>
                            <p>Disk Space</p>
                        </div>
                    </div>
                    <div class="2xl:w-96 bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                            <i className="" />
                        </div>
                        <div class="text-right">
                            <p class="text-2xl">{user.used.slots}/{user.resources.slots} servers</p>
                            <p>Slots</p>
                        </div>
                    </div>
                    </div>
                </div>
                <nav class="rounded-md w-48 h-screen flex-col justify-between">
                    <div style={{backgroundColor: "rgb(17, 24, 39)"}} class=" h-full">
                        <div class="pl-10">
                            <ul class="space-y-8 pt-10 text-white relative right-8">
                                <li class="flex space-x-4 items-center">
                                    <div className="hover:text-indigo-400 cursor-pointer" style={{ position: 'relative' }}>
                                        <div className={styles.navbut} style={{ backgroundColor: '#19181E', padding: 8, borderRadius: 2, paddingLeft: 12, paddingRight: 12, width: 130, display: 'flex', borderLeft: '#0C6BAF 0.2rem solid', borderTopRightRadius: 16, borderBottomRightRadius: 16 }}>
                                            <i className="fas fa-home relative top-1" /> <div style={{ marginLeft: 6 }} >Dashboard</div>
                                        </div>
                                    </div>
                                </li>
                                <li class="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                                    <i className="fas fa-folder-plus" />
                                    <a href="">Create server</a>
                                </li>
                            </ul>
                        </div>
                    </div>
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
<<<<<<< Updated upstream
    if(!session?.created) {
        res.writeHead(307, {
            Location: '/login'
        });
        return res.end();
    }
    if (session?.created + 604800000 < Date.now()) {
=======
    if (session.created + 604800000 < Date.now()) {
>>>>>>> Stashed changes
        await Session.deleteOne({id})
        res.writeHead(307, {
            Location: '/login?error=expiredsession'
        });
        return res.end();
    }
    let user = await User.findOne({id: session.id})
<<<<<<< Updated upstream
    if(!user?.email) {
        res.writeHead(307, {
            Location: '/login'
        });
        return res.end();
    }
    if(!user?.resources.cpu || !user?.used.cpu) {
        await User.updateOne({id: session.id}, {resources: {
            cpu: config.resources.cpu,
            ram: config.resources.ram,
            disk: config.resources.disk,
            slots: config.resources.slots
        },
        used: {
            cpu: 0,
            ram: 0,
            disk: 0,
            slots: 0
        }})
        user = await User.findOne({id: session.id})
    }
    let password = true
    if(!user?.password) password = false 
    return {props: {user, password}}
=======
    return {props: user}
>>>>>>> Stashed changes
}

export default page
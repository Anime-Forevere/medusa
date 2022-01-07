import Image from "next/image"
import Head from "next/head"
import config from "../config"
import Navbar from "../components/navbar"
import styles from "../styles/dashboard.module.css"

let page = ({props}) => {
    let session = props
    return (
        <div className="bg-[#212f4d]">
            <Head>
                <script src="https://kit.fontawesome.com/e8588d4c11.js" crossOrigin="anonymous" />
            </Head>
            <div>
                <Navbar session={session} nav={false} />
                <div className="absolute left-48">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
                    <div class="w-96 bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                            <i className="" />
                        </div>
                        <div class="text-right">
                            <p class="text-2xl">100%</p>
                            <p>CPU</p>
                        </div>
                    </div>
                    <div class="w-96 bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                            <i className="" />
                        </div>
                        <div class="text-right">
                            <p class="text-2xl">{commas(1024)} MB</p>
                            <p>Memory (RAM)</p>
                        </div>
                    </div>
                    <div class="w-96 bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                            <i className="" />
                        </div>
                        <div class="text-right">
                            <p class="text-2xl">1024 MB</p>
                            <p>Disk Space</p>
                        </div>
                    </div>
                    <div class="w-96 bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                            <i className="" />
                        </div>
                        <div class="text-right">
                            <p class="text-2xl">2 Servers</p>
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

page.getInitialProps = async ({ req, res, query }) => {
    let token = req.cookies["next-auth.session-token"]
    let session = {};
    if (!req?.session && token) {
        session = await fetch("http://localhost:3000/api/auth/session", {
            headers: {
                cookie: `next-auth.session-token=${token}`
            }
        }).then(res => res.json())
        req["session"] = session
        return {props: session }
    }
    if (!req.session) {
        res.writeHead(307, {
            Location: '/login'
        });
        res.end();
    }
}

export default page
import config from "../config"
import Image from 'next/image'

let navbar = ({user, nav}) => {
    function dropdown() {
        let dd = document.getElementById("dropdown")
        if(dd.style.display === "none" || !dd.style?.display) {
            dd.style["display"] = "block"
        } else {
            dd.style["display"] = "none"
        }
    }

    return (
        <navbar>
            <div className="flex justify-between px-6 items-center py-4" style={{backgroundColor: "#111827"}}>
            <div className="flex space-x-4 items-center">
                <Image onClick={() => window.location.href = "/"} src="/server.svg"  width="32" height="32" />
                <button onClick={() => window.location.href = "/"} className="text-white font-bold text-xl tracking-wide cursor-pointer">{config.name}</button>
            </div>
            <ul className="flex space-x-6">
                {nav && <li onClick={() => window.location.href = "#top"} className="text-white text-lg font-semibold tracking-normal cursor-pointer">Home</li>}
                {nav && <li onClick={() => window.location.href = "#facts"} className="text-white text-lg font-semibold tracking-normal cursor-pointer">Facts</li>}
            </ul>
            <ul className="flex space-x-6">
                {!user && <button onClick={() => window.location.href = "/login"} className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Login</button>}
                {user && <button onClick={() => dropdown()} className="text-white flex" >
                    <img className="h-10 w-10 rounded-full" src={user.avatar} />
                    <text className="relative left-2 top-2">{user.name}</text>
                    <svg className="w-5 h-5 relative left-2.5 top-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>}
                {user && 
                <div id="dropdown" style={{display: "none"}} className="z-10 scale-95 absolute top-16 transition-all duration-300 transform right-0 w-56 mt-2 origin-top-right bg-[#111827] border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" role="menu">
                    <div className="px-4 py-3">         
                    <p className="text-sm leading-5 text-white">Signed in as</p>
                    <p className="text-sm font-bold leading-5 text-white truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                        <a href="javascript:void(0)" tabindex="0" className="text-white flex justify-between w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer" role="menuitem" >Account settings</a>
                    </div>
                    <div className="py-1">
                        <a onClick={() => window.location.href = "/api/auth/signOut"} tabindex="3" className="text-white flex justify-between w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer" role="menuitem" >Sign out</a>
                    </div>
                </div>}
            </ul>
            </div>
        </navbar>
    )
}

export default navbar
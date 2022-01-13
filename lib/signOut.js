import { getCookie, removeCookies } from 'cookies-next';

function signOut() {
    let session = getCookie(`session`)
    if(!session) return window.location.href = "/login"
    removeCookies(`session`)
    return window.location.href = "/login"
}

export default signOut
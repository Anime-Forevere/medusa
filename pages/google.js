<<<<<<< Updated upstream
import { useEffect } from "react"

let page = ({props}) => {
    useEffect(() => {
        let hash = window.location.hash
        hash = hash.replace("#", "?")
        window.location.href = "/api/auth/callback/google" + hash
    })
=======
let page = ({props}) => {
    let hash = props
    function getHash() {
        console.log(window.location.hash)
    }
>>>>>>> Stashed changes
    return (
        <div>
            Hello! This page is made so API can fetch # parameters
        </div>
    )
}

export default page
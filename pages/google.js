import { useEffect } from "react"

let page = ({props}) => {
    useEffect(() => {
        let hash = window.location.hash
        hash = hash.replace("#", "?")
        window.location.href = "/api/auth/callback/google" + hash
    })
    return (
        <div>
            Hello! This page is made so API can fetch # parameters
        </div>
    )
}

export default page
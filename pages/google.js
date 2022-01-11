let page = ({props}) => {
    let hash = props
    function getHash() {
        console.log(window.location.hash)
    }
    return (
        <div>
            Hello! This page is made so API can fetch # parameters
        </div>
    )
}

export default page
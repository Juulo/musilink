// fetches our members from json server
export const getMembers = () => {
    return fetch("http://localhost:8088/members?_expand=tag&_expand=genre")
        .then(res => res.json())
}

// fetches our user's requests data from json server
export const getUserRequests = () => {
    const musiLinkUser = localStorage.getItem("musilink_user")
    return fetch(`http://localhost:8088/requests?userId=${parseInt(musiLinkUser)}`)
        .then(res => res.json())
}


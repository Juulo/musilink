// fetches our members from json server
export const getMembers = () => {
    return fetch("http://localhost:8088/members?_expand=tag&_expand=genre&_expand=user")
        .then(res => res.json())
}

// fetches our user's requests data from json server
export const getUserRequests = () => {
    const musiLinkUser = localStorage.getItem("musilink_user")
    return fetch(`http://localhost:8088/requests?userId=${parseInt(musiLinkUser)}&_expand=member&_expand=user`)
        .then(res => res.json())
}

// fetches our member's requests data from json server
export const getMemberRequests = () => {
    const musiLinkMember = localStorage.getItem("musilink_member")
    return fetch(`http://localhost:8088/requests?memberId=${parseInt(musiLinkMember)}&_expand=user`)
        .then(res => res.json())
}

export const getAllUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(res => res.json())
}

export const getUser = () => {
    const musiLinkUser = localStorage.getItem("musilink_user")
    return fetch(`http://localhost:8088/users/${parseInt(musiLinkUser)}`)
        .then(res => res.json())
}

export const getTags = () => {
    return fetch("http://localhost:8088/tags")
        .then(res => res.json())
}

export const getGenres = () => {
    return fetch("http://localhost:8088/genres")
        .then(res => res.json())
}


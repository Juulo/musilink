import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getMembers, getUserRequests, getAllUsers } from "../ApiManager"
import "./UserRequests.css"

export const UserRequests = () => {
    // deconstruct an array with our requests array and a function to update said requests on page load
    const [requests, updateRequests] = useState([])
    // fetch and store state of all users 
    // also fetch all members to expand users on
    const [users, updateUsers] = useState([])
    const [members, updateMembers] = useState([])
    const history = useHistory()
    
    // use effect to update requests page on load
    useEffect(
        () => {
            getAllUsers()
                .then((data) => { updateUsers(data) })
                .then(getMembers)
                .then((data) => { updateMembers(data) })
                .then(getUserRequests)
                .then((data) => { updateRequests(data) })
        },[]
    )
    
    // create a function that deletes our request on the click of a button
    const deleteRequests = (id) => {
        fetch(`http://localhost:8088/requests/${id}`, {
            method: "DELETE"
        })
            .then(
                () => {
                    fetch("http://localhost:8088/requests?_expand=member&_expand&_expand=user")
                        .then(res => res.json())
                        .then((data) => {updateRequests(data)})
                }
            )
    }
    // we want to only dispay the names of all requestees who are members
        // to do this for each request we need to "find" the member that is tied to that request
            // then return the name of that member from the expanded users table
    // return a string that shows the info on the request for every request
    
    return(
        <>
            <h2 className="requestsTitle">Your Requests</h2>
            <div className="userRequests">
            {
                requests.map((request) => {
                        // member.tag member.genre user.name user.email
                    const foundUserThatIsMember = users.find((user) => {
                        return user.id === request.member.userId
                    })
                        if(!request.accepted && !request.completed) {
                            return <div className="pendingRequests"><p key={`pendingRequest--${request.id}`}>Deadline: {request.deadline}<br/>Requestee: {foundUserThatIsMember.name}<br/> Description: {request.description}
                            <button className="deleteButton" onClick={() => deleteRequests(request.id)}>Delete</button>
                            </p></div>
                        } else if (request.accepted && !request.completed) {
                            return <div className="acceptedRequests"><p key={`acceptedRequest--${request.id}`}>Deadline: {request.deadline}<br/>Requestee: {foundUserThatIsMember.name}<br/> Description: {request.description}
                            <button className="deleteButton" onClick={() => deleteRequests(request.id)}>Delete</button>
                            </p></div>
                        } else if (!request.accepted && request.completed) {
                            return <div className="completedRequests"><p key={`completedRequest--${request.id}`}>Deadline: {request.deadline}<br/>Requestee: {foundUserThatIsMember.name}<br/> Description: {request.description}
                            <button className="deleteButton" onClick={() => deleteRequests(request.id)}>Delete</button>
                            </p></div>
                        }
                })
            }
            <div className="linkToProfile">
                <button className="profileButton" onClick={() => 
                    history.push(`/userProfile/${parseInt(localStorage.getItem("musilink_user"))}`)}>
                        Visit Profile
                </button>
            </div>
            </div>
        </>
    )
}
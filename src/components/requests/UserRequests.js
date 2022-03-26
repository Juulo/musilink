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
            <h2 className="userRequestsTitle">Your Requests</h2>
            <div className="userRequestTypes">
                <div className="pendingUserRequests">
                    <h4 className="userPending">Pending Requests</h4>
                    {
                        requests.map((request) => {
                            const foundUserThatIsMemberForPending = users.find((user) => {
                                return user.id === request.member.userId
                            })
                                if(!request.accepted && !request.completed) {
                                    return <div align="left"className="userPendingRequests"><p key={`pendingRequest--${request.id}`}>Deadline: {request.deadline}<br/>Requestee: {foundUserThatIsMemberForPending.name}<br/> Description: {request.description}
                                    </p><button className="deleteButton" onClick={() => deleteRequests(request.id)}>Delete</button>
                                    </div>
                                }
                        })
                    }
                </div>                
                <div className="acceptedUserRequests">
                    <h4 className="userAccepted">Accepted Requests</h4>
                    {
                        requests.map((request) => {
                            // member.tag member.genre user.name user.email
                            const foundUserThatIsMemberForAccepted = users.find((user) => {
                                return user.id === request.member.userId
                            })
                                if (request.accepted && !request.completed) {
                                    return <div align="center"className="userAcceptedRequests"><p key={`acceptedRequest--${request.id}`}>Deadline: {request.deadline}<br/>Requestee: {foundUserThatIsMemberForAccepted.name}<br/> Description: {request.description}
                                    </p><button className="deleteButton" onClick={() => deleteRequests(request.id)}>Delete</button>
                                    </div>
                                }
                        })
                    }
                </div>                
                <div className="completedUserRequests">
                    <h4 className="userCompleted">Completed Requests</h4>
                    {
                        requests.map((request) => {
                            // member.tag member.genre user.name user.email
                            const foundUserThatIsMember = users.find((user) => {
                                return user.id === request.member.userId
                            })
                                if (!request.accepted && request.completed) {
                                    return <div align="right"className="userCompletedRequests"><p key={`completedRequest--${request.id}`}>Deadline: {request.deadline}<br/>Requestee: {foundUserThatIsMember.name}<br/> Description: {request.description}
                                    </p><button className="deleteButton" onClick={() => deleteRequests(request.id)}>Delete</button>
                                    </div>
                                }
                        })
                    }
                </div>                
            </div>
            <div className="userRequests">
            <div className="linkToProfile">
                <button className="userProfileButton" onClick={() => 
                    history.push(`/userProfile/${parseInt(localStorage.getItem("musilink_user"))}`)}>
                        Visit Profile
                </button>
            </div>
            </div>
        </>
    )
}
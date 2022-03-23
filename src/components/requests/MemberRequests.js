import { useState, useEffect } from "react";
import { getAllUsers, getMemberRequests } from "../ApiManager";
import { useHistory } from "react-router-dom";

// create a component that displays all requests for logged in member
export const MemberRequests = () => {
    // deconstuct array
    const [requests, updateRequests] = useState([])
    const [users, updateUsers] = useState([])
    const history = useHistory()
    
    // useEffect to update state of data on DOM
    useEffect(
        () => {
            getAllUsers()
                .then((data) => {updateUsers(data)})
                getMemberRequests()
                .then((data) => {updateRequests(data)})
        },[]
    )
    
    // create a function that deletes requests
    const denyRequest = (id) => {
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
    // create a function that accepts requests
    const acceptRequest = (id) => {
        fetch(`http://localhost:8088/requests/${id}`, {
            method: "PUT"
        })
            .then(
                () => {
                    fetch("http://localhost:8088/requests?_expand=member&_expand&_expand=user")
                        .then(res => res.json())
                        .then((data) => {updateRequests(data)})
                }
            )
    }   

    // map each request with the members ID
    // need a conditional that checks if a request for the member is pending, accepted, or completed
    // then we seperate those categories into different divs accordingly
    return(
        <>
            <h2 className="requestsTitle">Your Requests</h2>
            <div className="memberRequests">
            {
                requests.map((request) => {
                    if(!request.accepted && !request.completed) {
                        return <div className="pendingRequests"><p key={`request--${request.id}`}>Deadline: {request.deadline}<br/> Description: {request.description}<br/> Requester: {request.user.name} 
                        <button className="denyButton" onClick={() => denyRequest(request.id)}>Deny</button>
                        <button className="acceptButton" onClick={() => acceptRequest(request.id)}>Accept</button>
                        </p></div>
                    } else if (request.accepted && !request.completed) {
                        return <div className="acceptedRequests"><p key={`request--${request.id}`}>Deadline: {request.deadline}<br/> Description: {request.description}<br/> Requester: {request.user.name}
                        <button className="requestButton" onClick={() => denyRequest(request.id)}>Abandon</button>
                        </p></div>
                    } else if (!request.accepted && request.completed) {
                        return <div className="completedRequests"><p key={`request--${request.id}`}>Deadline: {request.deadline}<br/> Description: {request.description}<br/> Requester: {request.user.name}
                        <button className="requestButton" onClick={() => denyRequest(request.id)}>Delete</button>
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

import { useState, useEffect } from "react";
import { getAllUsers, getMemberRequests } from "../ApiManager";
import { useHistory } from "react-router-dom";
import "./MemberRequests.css"

// create a component that displays all requests for logged in member
export const MemberRequests = () => {
    // deconstuct array
    const [requests, updateRequests] = useState([])
    const [users, updateUsers] = useState([])
    // get our request object so that we can use PUT method to replace data
    // set each properties initial data as the current object data
    const [request, updateThisRequest] = useState({})
    const history = useHistory()
    
    // create a function that updates the page on all data change
    const updateAllInfoOnPage = () => {
        getAllUsers()
            .then((data) => {updateUsers(data)})
            getMemberRequests()
            .then((data) => {updateRequests(data)})
    }
    // useEffect to update state of data on DOM
    useEffect(
        () => {
            updateAllInfoOnPage()
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
    // create a function that accepts requests on click
    const acceptRequest = (evt, request) => {
        evt.preventDefault()
        // create our new object with the requests initial data and the changed request.accepted value to true
        const acceptTheRequestEdit = {
            userId: request.userId,
            memberId: request.memberId,
            description: request.description,
            deadline: request.deadline,
            accepted: true,
            dateAccepted: request.dateAccepted,
            completed: request.completed,
            dateCompleted: request.dateCompleted
        }
        return fetch(`http://localhost:8088/requests/${request.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(acceptTheRequestEdit)
        })
            .then(
                () => {
                    updateAllInfoOnPage()
                }
            )
            
        // call function to update all info on page
    }
    // create a function that lists requests as complete on click
    const completeRequest = (evt, request) => {
        evt.preventDefault()
        // create a new request object with our inital request data and the accepted property given a value of false
        // then give our completed property a value of true
        const completeTheRequestEdit = {
            userId: request.userId,
            memberId: request.memberId,
            description: request.description,
            deadline: request.deadline,
            accepted: false,
            dateAccepted: request.dateAccepted,
            completed: true,
            dateCompleted: request.dateCompleted
        }
        return fetch(`http://localhost:8088/requests/${request.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(completeTheRequestEdit)
        })
            .then(
                () => {
                    updateAllInfoOnPage()
                }
            )
    }

    // map each request with the members ID
    // need a conditional that checks if a request for the member is pending, accepted, or completed
    // then we seperate those categories into different divs accordingly
    return(
        <>
            <h2 className="requestsTitle">Your Requests</h2>
            <div className="requestTypes">
                <div className="pendingMemberRequests">
                    <h4 className="pending">Pending Requests</h4>
                    {
                        requests.map((request) => {
                            if(!request.accepted && !request.completed) {
                                return <div align="left" className="pendingRequests"><p key={`pendingRequest--${request.id}`}>Deadline: {request.deadline}<br/> Requester: {request.user.name} <br/> Description: {request.description}
                                </p><button className="denyButton" onClick={() => denyRequest(request.id)}>Deny</button>
                                <button className="acceptButton" onClick={(evt) => acceptRequest(evt, request)}>Accept</button>
                                </div>
                            }
                        })
                    }
                </div>               
                <div className="acceptedMemberRequests">
                    <h4 className="accepted">Accepted Requests</h4>
                    {
                        requests.map((request) => {
                            if(request.accepted && !request.completed) {
                                return <div align="center" className="acceptedRequests"><p key={`acceptedRequest--${request.id}`}>Deadline: {request.deadline}<br/> Requester: {request.user.name}<br/> Description: {request.description}
                                </p><button className="abandonButton" onClick={() => denyRequest(request.id)}>Abandon</button>
                                <button className="completeButton" onClick={(evt) => completeRequest(evt, request)}>Complete</button>
                                </div>
                            }
                        })
                    }
                </div>                  
                <div className="completedMemberRequests">
                    <h4 className="completed">Completed Requests</h4>
                    {
                        requests.map((request) => {
                            if(!request.accepted && request.completed) {
                                return <div align="right" className="completedRequests"><p key={`completedRequest--${request.id}`}>Deadline: {request.deadline}<br/> Requester: {request.user.name}<br/> Description: {request.description}
                                </p><button className="memberDeleteButton" onClick={() => denyRequest(request.id)}>Delete</button>
                                </div>
                            }
                        })
                    }
                </div>
            </div>
            <div className="linkToProfile">
                <button className="profileButton" onClick={() => 
                    history.push(`/userProfile/${parseInt(localStorage.getItem("musilink_user"))}`)}>
                        Visit Profile
                </button>
            </div>
        </>
    )
}

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
    const [isFading, setIsFading] = useState(false)
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
    
    const fade = (cb) => {
        setIsFading(true)
        cb()
    }
    
    // create a function that deletes requests
    const denyRequest = (id) => {
        fetch(`http://localhost:8088/requests/${id}`, {
            method: "DELETE"
        })
            .then(()=>{setIsFading(false)})
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
        let today = new Date(Date.now())
        today = `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`
        // create our new object with the requests initial data and the changed request.accepted value to true
        const acceptTheRequestEdit = {
            userId: request.userId,
            memberId: request.memberId,
            description: request.description,
            deadline: request.deadline,
            accepted: true,
            dateAccepted: today,
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
                    setIsFading(false)
                }
            )         
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
        let today = new Date(Date.now())
        today = `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`
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
            dateCompleted: today
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
                    setIsFading(false)
                }
            )
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
                    <h4 className="pending">Pending Acceptance</h4>
                    {
                        requests.map((request) => {
                            if(!request.accepted && !request.completed) {
                                return <div align="left" className={isFading ? "requestFade" : "pendingRequests"}><p key={`pendingRequest--${request.id}`}>
                                    Deadline: {request.deadline}<br/> Requester: {request.user.name} <br/> Description: {request.description}
                                </p><button className="denyButton" onClick={() => fade(setTimeout(() =>denyRequest(request.id), 1550))}>Deny</button>
                                <button className="acceptButton" onClick={(evt) => fade(setTimeout(() =>acceptRequest(evt, request), 1550))}>Accept</button>
                                </div>
                            }
                        })
                    }
                </div>               
                <div className="acceptedMemberRequests">
                    <h4 className="accepted">In Progress</h4>
                    {
                        requests.map((request) => {
                            if(request.accepted && !request.completed) {
                                return <div align="center" className={isFading ? "requestFade" : "acceptedRequests"}><p key={`acceptedRequest--${request.id}`}>
                                    Deadline: {request.deadline}<br/> Requester: {request.user.name}<br/> Description: {request.description}
                                </p><button className="abandonButton" onClick={() => fade(setTimeout(() =>denyRequest(request.id), 1550))}>Abandon</button>
                                <button className="completeButton" onClick={(evt) => fade(setTimeout(() =>completeRequest(evt, request), 1550))}>Complete</button>
                                </div>
                            }
                        })
                    }
                </div>                  
                <div className="completedMemberRequests">
                    <h4 className="completed">Completed</h4>
                    {
                        requests.map((request) => {
                            if(!request.accepted && request.completed) {
                                return <div align="right" className={isFading ? "requestFade" : "completedRequests"}><p key={`completedRequest--${request.id}`}>
                                    Deadline: {request.deadline}<br/> Requester: {request.user.name}<br/> Description: {request.description}
                                </p><button className="memberDeleteButton" onClick={() => fade(setTimeout(() =>denyRequest(request.id), 1550))}>Delete</button>
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

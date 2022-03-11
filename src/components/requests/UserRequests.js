import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getUserRequests } from "../ApiManager"

export const UserRequests = () => {
    // deconstruct an array with our requests array and a function to update said requests on page load
    const [requests, updateRequests] = useState([])

    
    // use effect to update requests page on load
    useEffect(
        () => {
            getUserRequests()
                .then((data) => {updateRequests(data)})
        },[]
    )
    
    // create a function that deletes our request on the click of a button
    const deleteRequests = (id) => {
        fetch(`http://localhost:8088/requests/${id}`, {
            method: "DELETE"
        })
            .then(
                () => {
                    fetch("http://localhost:8088/requests?_expand=member")
                        .then(res => res.json())
                        .then((data) => {updateRequests(data)})
                }
            )
    }
    // return a string that shows the info on the request for every request
    return(
        <>
            <h2>Your Requests</h2>
            {
                requests.map((request) => {
                    return <p key={`request--${request.id}`}>Deadline: {request.deadline}
                    <button onClick={() => {deleteRequests(request.id)}}>Delete</button></p>
                })
            }
        </>
    )
}
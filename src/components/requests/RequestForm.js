import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import "./RequestForm.css"

// we need to make sure the member selected from our members array is being tracked
export const RequestForm = () => {
    const [request, updateRequest] = useState({
        description: "",
        deadline: "",
        accepted: false,
        dateAccepted: "",
        completed: false,
        dateCompleted: ""
    })

    const {memberId} = useParams()
    const history = useHistory()
    // variable to assign our current logged in user
    const musiLinkUser = localStorage.getItem("musilink_user")

    // create a function that posts our new request into our requests array in json
    const createNewRequest = (event) => {
        event.preventDefault()
        const newRequest = {
            userId: parseInt(musiLinkUser),
            memberId: parseInt(memberId),
            description: request.description,
            deadline: request.deadline,
            accepted: request.accepted,
            dateAccepted: request.dateAccepted,
            completed: request.completed,
            dateCompleted: request.dateCompleted
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRequest)
        }
        return fetch("http://localhost:8088/requests", fetchOption)
            .then(() => history.push("/userRequests"))
    }


    return(
        <>
            <div className="requestForm">
                <h2 className="requestForm__title">New Request</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            required autoFocus
                            className="form-control"
                            placeholder="Enter a description..."
                            onChange={(event) => {
                                const copy = {...request}
                                copy.description = event.target.value
                                updateRequest(copy)
                            }} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="date">Deadline:</label>
                        <input
                            required autoFocus
                            type="date"
                            className="form-control"
                            placeholder="Enter your deadline..."
                            onChange={(event) => {
                                const copy = {...request}
                                copy.deadline = event.target.value
                                updateRequest(copy)
                            }} />
                    </div>
                </fieldset>
                <button className="requestFormButton" onClick={(event)=>createNewRequest(event)}>
                    Create Request
                </button>
            </div>
        </>
    )
}


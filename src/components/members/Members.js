import React, { useState, useEffect } from "react"
import { getMembers } from "../ApiManager"
import { useHistory } from "react-router-dom"
import "./Members.css"

// component returns html for all members in our database
export const Members = () => {
    // deconstruct an array with our members array and a function to update members on page load
    const [members, updateMembers] = useState([])
    const [query, setQuery] = useState("")
    const history = useHistory()

    // useEffect to fetch our members data and our function to update said data
    useEffect(
        () => {
            getMembers()
                .then((data) => {updateMembers(data)})
        },[]
    )

    // for every member this string will display on the dom
    // our button needs to take us to make request page but also track the state of the member the button was pressed on
    return(
        <>
            <h2 className="membersTitle">Our Members</h2>
            <div className="searchArea">
                <input placeholder="Enter name, title, genre..." onChange={(event) => setQuery(event.target.value)}/>
            </div>
            <div className="membersList">
            {
                members.filter((member) => {
                    if (query === "") {
                        return member
                    } else if (member.genre.genre.toLowerCase().includes(query.toLowerCase())) {
                        return member
                    } else if (member.user.name.toLowerCase().includes(query.toLowerCase())) {
                        return member
                    } else if (member.tag.tag.toLowerCase().includes(query.toLowerCase())) {
                        return member
                    }
                }).map((member) => {
                    return <div className="member" key={`member--${member.id}`}><p>{member.user.name}<br/>{member.user.email}<br/>
                        {member.tag.tag}<br/>{member.genre.genre}<br/>${member.budget}</p>
                        <button className="requestButton" onClick={() => history.push(`/makeRequest/${member.id}`)}>Request</button>
                        </div>
                })
            }
            </div>
        </>
    )
}
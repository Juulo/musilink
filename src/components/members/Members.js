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
                <input placeholder="Enter genre..." onChange={(event) => setQuery(event.target.value)}/>
            </div>
            {
                members.filter((member) => {
                    if (query === "") {
                        return member
                    } else if (member.genre.genre.toLowerCase().includes(query.toLowerCase())) {
                        return member
                    }
                }).map((member) => {
                    return <div className="member" key={`member--${member.id}`}>{member.user.name}<br/>{member.user.email}<br/>{member.phone}<br/>
                    {member.tag.tag}<br/>{member.genre.genre}<br/>${member.budget}
                    <div><button className="requestButton" onClick={() => history.push(`/makeRequest/${member.id}`)}>Make Request</button></div></div>
                })
            }
        </>
    )
}
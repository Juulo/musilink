import React, { useState, useEffect } from "react"
import { getMembers } from "../ApiManager"
import { Link, useHistory } from "react-router-dom"

// component returns html for all members in our database
export const Members = () => {
    // deconstruct an array with our members array and a function to update members on page load
    const [members, updateMembers] = useState([])
    const [member, setMember] = useState({})
    const history = useHistory()

    // useEffect to fetch our members data and our function to update said data
    useEffect(
        () => {
            getMembers()
                .then((data) => {updateMembers(data)})
        },[]
    )
    
    // we need a function that says on click of button set this member
    // const trackMember = () => {
    //     if (member) {
    //         setMember(member)
    //     }
    // }

    // for every member this string will display on the dom
    // our button needs to take us to make request page but also track the state of the member the button was pressed on
    return(
        <>
            <h2>Our Members</h2>
            {
                members.map((member) => {
                    return <div key={`member--${member.id}`}>{member.name}<br/>{member.email}<br/>{member.phone}<br/>
                    {member.tag.tag}<br/>{member.genre.genre}<br/>${member.budget}
                    <div><button onClick={() => history.push(`/makeRequest/${member.id}`)}>Make Request</button></div></div>
                })
            }
        </>
    )
}
import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { getGenres, getTags } from "../ApiManager"
import "./Login.css"

export const MemberRegister = (props) => {
    const [member, setMember] = useState({})
    const [tags, updateTags] = useState([])
    const [genres, updateGenres] = useState([])

    const conflictDialog = useRef()

    const history = useHistory()


    const existingMemberCheck = () => {
        return fetch(`http://localhost:8088/members?memberId=${member.id}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const updateTagsAndGenres = () => {
        getTags()
            .then((data)=>{updateTags(data)})
            getGenres()
                .then((data)=>{updateGenres(data)})
    }

    useEffect(
        () => {
            updateTagsAndGenres()
        },[]
    )

    // this function has to check whether the checkbox was clicked (thus making isMember true)
    // if it wasn't clicked POST and send user to userRequests
    // if it was clicked POST and send user to memberRequests
    const handleRegister = (e) => {
        e.preventDefault()
        existingMemberCheck()
            .then((userExists) => {
                const copy = {...member}
                copy.userId = parseInt(localStorage.getItem("musilink_user"))
                fetch("http://localhost:8088/members", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(copy)
                })
                    .then(res => res.json())
                    .then(
                        (res) => {
                        localStorage.setItem("musilink_member", res.id)
                        history.push("memberRequests")
                    })  
            })
    }

    const updateMember = (evt) => {
        const copy = {...member}
        copy[evt.target.id] = parseInt(evt.target.value)
        setMember(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h3 className="h3 mb-3 font-weight-normal">Check your occupation, genre, and budget</h3>
                <fieldset>
                    <label htmlFor="occupation"> Occupation </label>
                    <ul>
                    {
                        tags.map((tag)=>{                           
                            return <div className="tagList"><input onChange={updateMember} name="thisButton" type="radio" value={tag.id} id="tagId" className="form-control" required autoFocus />{tag.tag}</div>
                        })
                    }
                    </ul>
                </fieldset>
                <fieldset>
                    <label htmlFor="genre"> Genres </label>
                    <ul>
                    {
                        genres.map((genre)=>{
                            return <div className="genreList"><input onChange={updateMember} name="thisButton" type="radio" value={genre.id} id="genreId" className="form-control" required autoFocus />{genre.genre}</div>
                        })
                    }
                    </ul>
                </fieldset>
                <fieldset>
                    <label htmlFor="budget"> What is your estimated budget? </label>
                    <input onChange={updateMember}
                           type="number" id="budget" className="form-control"
                           placeholder="Enter your budget" required autoFocus />
                </fieldset>
                <fieldset>
                    <button type="submit"> Submit </button>
                </fieldset>
            </form>
        </main>
    )
}


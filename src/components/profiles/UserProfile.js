// this component will return only the the profile elements of the currently signed in user
import { useState, useEffect } from "react";
import { getUser } from "../ApiManager";

// create a function that exports our users profile component
export const UserProfile = () => {
    // create an array deconstruction of the user and a function to update its state
    // use state to update the state of our data
    const [user, updateUser] = useState({})
    // return our html
    // we shouldnt need a map here but we can use one if we want

    const updatingUserProfile = () => {
        getUser()
            .then((data) =>{ updateUser(data)})
    }

    useEffect(
        () => {
            updatingUserProfile()
        },[]
    )    
    
    // *stretch* create a function that lets a member edit their information "PUT"
    const changeUserName = (evt, user) => {
        const nameEdit = {
            name: evt.target.value,
            email: user.email,
            phone: user.phone,
            about: user.about
        }
        return fetch(`https://localhost:8088/users?userId=${user.id}`,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(nameEdit)
        })
            .then(
                () => {
                    updatingUserProfile()
                }
            )
    }

    const changeUserEmail = (evt, user) => {
        const emailEdit = {
            name: user.name,
            email: evt.target.value,
            phone: user.phone,
            about: user.about
        }
        return fetch(`https://localhost:8088/users?userId=${user.id}`,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(emailEdit)
        })
            .then(
                () => {
                    updatingUserProfile()
                }
            )
    }
    
    const changeUserPhone = (evt, user) => {
        const phoneEdit = {
            name: user.name,
            email: user.email,
            phone: evt.target.value,
            about: user.about
        }
        return fetch(`https://localhost:8088/users?userId=${user.id}`,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(phoneEdit)
        })            
            .then(
                () => {
                    updatingUserProfile()
                }
            )
    }

    const changeUserAbout = (evt, user) => {
        const aboutEdit = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            about: evt.target.value
        }
        return fetch(`https://localhost:8088/users?userId=${user.id}`,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(aboutEdit)
        })            
            .then(
                () => {
                    updatingUserProfile()
                }
            )
    }

    return(
        <>
            <h2>Your Profile</h2>
            <div className="profileSection"> 
                <section className="userInfo">
                    <div className="userName">
                        <h4>Name</h4>
                        <button 
                            className="editProfileButton" onClick={(evt)=>{changeUserName(evt, user)}}>Edit</button>
                        <p>{user.name}</p>
                    </div>
                    <div className="userEmail">
                        <h4>Email</h4>
                        <button className="editProfileButton" onClick={(evt)=>{changeUserEmail(evt, user)}}>Edit</button>
                        <p>{user.email}</p>
                    </div>
                    <div className="userPhone">
                        <h4>Phone</h4>
                        <button className="editProfileButton" onClick={(evt)=>{changeUserPhone(evt, user)}}>Edit</button>
                        <p>{user.phone}</p>
                    </div>
                    <div className="userAbout">
                        <h4>About</h4>
                        <button className="editProfileButton" onClick={(evt)=>{changeUserAbout(evt, user)}}>Edit</button>
                        <p>{user.about}</p>
                    </div>
                    {
                        () => {
                            if(user.isMember) {
                                return <div className="memberInfo"><div className="userTag">
                                    <h4>Occupation</h4>
                                    {user}
                                </div>
                                <div className="userGenre">
                                    <h4>Genre</h4>
                                </div>
                                </div>
                            }
                        }
                    }
                </section>                
            </div>
        </>
    )
}
// this component will return only the the profile elements of the currently signed in user
import { useState, useEffect } from "react";
import { getUser } from "../ApiManager";

// create a function that exports our users profile component
export const UserProfile = () => {
    // create an array deconstruction of the user and a function to update its state
    // use state to update the state of our data
    const [users, updateUser] = useState([])
    // return our html
    // we shouldnt need a map here but we can use one if we want

    useEffect(
        () => {
            getUser()
            .then((data) => updateUser(data))
        },[]
    )    
    
    // *stretch* create a function that lets a member edit their information "PUT"
    const changeUserInfo = () => {
        const fetchOption = {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify()
        }
    }

    return(
        <>
            <h2>Your Profile</h2>
            <div className="profileSection">
                {
                    users.map((user) => {
                        if (!user.isMember) {
                        <section className="userInfo">
                            <div className="userName">
                                <h4>Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div className="userEmail">
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div className="userEmail">
                                <h4>Phone</h4>
                                <p>{user.phone}</p>
                            </div>
                            <div className="userAbout">
                                <h4>About</h4>
                                <p>{user.about}</p>
                            </div>
                        </section>
                        }
                    })
                }
            </div>
        </>
    )
}
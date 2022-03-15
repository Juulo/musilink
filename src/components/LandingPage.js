import React from "react"
import { useHistory } from "react-router-dom"
import logo from "./logo2.png"
import "./LandingPage.css"

// simple html component for landing page
export const LandingPage = () => {
    const history = useHistory()
    return (
        <section className="landingSection">
            <div className="landingLogo">
                <img src={logo}></img>
            </div>
            <div className="landingText">
                <h2>Hi, Welcome to MusiLink</h2>
                <p>Our site is dedicated to connecting you <br/>
                    with other talented individuals to make <br/>
                    the music you need
                </p>
                <button onClick={() => history.push("/login")}>Login/Register</button>
            </div>
        </section>
    )
}
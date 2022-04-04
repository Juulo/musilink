import React from "react"
import { useHistory } from "react-router-dom"
import logo from "./logosvg.svg"
import "./LandingPage.css"

// simple html component for landing page
export const LandingPage = () => {
    const history = useHistory()
    return (
        <body>
            <section className="landingSection">
                <div className="landingLogoRef">
                    <img className="landingLogo" src={logo}></img>
                </div>
                <div className="landingText">
                    <h2>Hi, Welcome to MusiLink</h2>
                    <p>Our site is dedicated to connecting you <br/>
                        with other talented individuals to make <br/>
                        the music you need.
                    </p>
                    <button onClick={() => history.push("/login")}>Login/Register</button>
                </div>
            </section>
            <section className="heroSection">
                <div className="heroImgRef">
                    <img className="heroImg" src="https://w0.peakpx.com/wallpaper/816/866/HD-wallpaper-woman-playing-violin.jpg"></img>
                </div>
                <div className="heroText">
                    <h2>Now's your moment to collaborate</h2>
                    <p>Reach out to our group of musical members and work on the project of your dreams.</p>
                </div>
            </section>
            <section className="shoutoutSection">
                <div className="shoutoutText">
                    <h2>Meet some of our members</h2>
                    <p>Musilink is a source of access to some the most talented, musically minded people in the industry. Create an account to start
                        making connections!
                    </p>
                </div>
                <div className="shoutuoutImgRef">
                    <img className="shoutoutImg" src="https://ak.picdn.net/shutterstock/videos/12665741/thumb/1.jpg"></img>
                </div>
            </section>
            <footer>
                <p>© Jajuan Jones Technologies 2022, a Software Developer</p>
            </footer>
        </body>
    )
}
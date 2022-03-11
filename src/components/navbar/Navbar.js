import React from "react"
import { Link } from "react-router-dom"

export const Navbar = () => {
    return(
        //Links for browser components
        <ul className="navbar">
            <div className="navLogo">
                <img src="src\components\images\NavbarLogo.png"></img>
            </div>
            <div className="navbar_item active">
                <Link className="navbar_link" to="/members">Find a Member</Link>
            </div>
            <div className="navbar_item active">
                <Link className="navbar_link" to="/userRequests">Your Requests</Link>
            </div>
            <div className="navbar_item active">
                <Link className="navbar_link" to="/">Logout</Link>
            </div>
        </ul>
    )
}

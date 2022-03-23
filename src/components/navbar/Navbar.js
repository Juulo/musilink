import React from "react"
import { Link } from "react-router-dom"
import logo from "./navlogo2.png"
import "./Navbar.css"

export const Navbar = () => {
    //Links for browser components
    return(
        <>
        <ul className="navbar">
            <div className="navLogo">
                <img src={logo}></img>
            </div>
            <div className="navbar_item active">
                <Link className="navbar_link" to="/members">Find a Member</Link>
            </div>
            <div className="navbar_item active">
                <Link className="navbar_link" to="/userRequests">Your Requests</Link>
            </div>
            <div className="navbar_item active">
                <Link to="/" onClick={()=>{
                    localStorage.removeItem("musilink_user")}}>Logout</Link>
            </div>
        </ul>
        </>
    )
}

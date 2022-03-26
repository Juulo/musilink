import React from "react"
import { Link } from "react-router-dom"
import logo from "./navlogo2.png"
import "./Navbar.css"

export const MemberNavbar = () => {
    return(
        <>
           <ul className="navbar">
                <div className="navLogo">
                    <img src={logo} style="width:20px;height:auto;"></img>
                </div>
                <div className="navbar_item active">
                    <Link className="navbar_link" to="/memberRequests">Your Requests</Link>
                </div>
                <div className="navbar_item active">
                    <Link to="/" onClick={()=>{
                        localStorage.removeItem("musilink_user")}}>Logout</Link>
                </div>
            </ul> 
        </>
    )
}
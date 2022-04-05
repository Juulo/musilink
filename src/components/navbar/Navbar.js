import React from "react"
import { Link } from "react-router-dom"
import logo from "./navlogo2.png"
import "./Navbar.css"

export const UserNavbar = () => {
    //Links for browser component
    if(localStorage.getItem("musilink_member")){
        return(
            <>
               <header className="navbar">
                    <div>
                        <img className="navLogo" src={logo}></img>
                    </div>
                    <div className="navbar_item active">
                        <Link className="navbar_link" to="/memberRequests">Your Requests</Link>
                    </div>
                    <div className="navbar_item active">
                        <Link className="navbar_link" to="/" onClick={()=>{
                            localStorage.clear()}}>Logout</Link>
                    </div>
                </header> 
            </>
        )
    }
    return(
        <>
           <header className="navbar">
                <div>
                    <img className="navLogo" src={logo}></img>
                </div>
                <div className="navbar_item active">
                    <Link className="navbar_link" to="/members">Find a Member</Link>
                </div>
                <div className="navbar_item active">
                    <Link className="navbar_link" to="/userRequests">Your Requests</Link>
                </div>
                <div className="navbar_item active">
                    <Link className="navbar_link" to="/" onClick={()=>{
                        localStorage.clear()}}>Logout</Link>
                </div>
            </header> 
        </>
    )
}


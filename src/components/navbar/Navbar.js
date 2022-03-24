import React from "react"
import { Link } from "react-router-dom"
import logo from "./navlogo2.png"
import "./Navbar.css"
import userEvent from "@testing-library/user-event"

export const Navbar = () => {
    //Links for browser components
    const checkCurrentAuthOfUser = () => {
        return fetch(`http://localhost:8088/users?userId=${parseInt(localStorage.getItem("musilink_user"))}`)
            .then(res => res.json())
    }
    const NavbarForMemberOrUser = (user) => {
        checkCurrentAuthOfUser()
        .then((user) => {
            if(user.isMember) {
                return <ul className="navbar">
                    <div className="navLogo">
                        <img src={logo}></img>
                    </div>
                    <div className="navbar_item active">
                        <Link className="navbar_link" to="/memberRequests">Your Requests</Link>
                    </div>
                    <div className="navbar_item active">
                        <Link to="/" onClick={()=>{
                            localStorage.removeItem("musilink_user")}}>Logout</Link>
                    </div>
                    </ul>         
            }else if(!user.isMember) {
                return  <ul className="navbar">
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
            }
        })
    }

    return(
        <>
            <NavbarForMemberOrUser/>
        </>
    )
}

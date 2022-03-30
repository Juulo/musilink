import React from "react"
import { ApplicationView } from "./ApplicationView"
import { UserNavbar } from "./navbar/Navbar";
import { MemberNavbar } from "./navbar/MemberNavbar";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./MusiLink.css";
import { LandingPage } from "./LandingPage";

// component that tells index file whether to load the landing page or load in or to send to requests 
// this component now needs to send the user to a different view if they have the isMember property
export const MusiLink = () => (
  <>
    <Route
      render={() => {
        const user = localStorage.getItem("musilink_user")
        
        if (user) {
          if (!user.isMember) {
            return <>
                <UserNavbar />
                <ApplicationView />
            </>
          }
          else if (user.isMember) {
            return <>
                <MemberNavbar />
                <ApplicationView />
            </>
          }else {
            return <Redirect to="/" />
          }
      }
    }}/>

    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/register">
      <Register />
    </Route>
    <Route exact path="/">
      <LandingPage/>
    </Route>
  </>
)
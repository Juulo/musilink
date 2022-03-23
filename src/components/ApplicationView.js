import React from "react"
import { Route } from "react-router-dom"
import { Members } from "./members/Members"
import { UserProfile } from "./profiles/UserProfile"
import { MemberRequests } from "./requests/MemberRequests"
import { RequestForm } from "./requests/RequestForm"
import { UserRequests } from "./requests/UserRequests"

// create an application view function to display all of our components in their different view paths
export const ApplicationView = () => {
    return(
        <>
            <Route exact path="/userRequests">
                <UserRequests/>
            </Route>
            <Route exact path="/members">
                <Members/>
            </Route>
            <Route exact path="/memberRequests">
                <MemberRequests/>
            </Route>
            <Route exact path="/userProfile/:userId(\d+)">
                <UserProfile/>
            </Route>
            <Route exact path="/makeRequest/:memberId(\d+)">
                <RequestForm/>
            </Route>
        </>
    )
}
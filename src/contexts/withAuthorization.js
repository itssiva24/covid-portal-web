import React, { Component, useContext } from "react";
import { useHistory } from "react-router";
import AuthUserContext from "./authUserContext";

export default (condition, redirect) => (Component) => (props) =>{
    const { authUser } = useContext(AuthUserContext)
    
    if (!condition(authUser)) {
        if (typeof window !== "undefined") useHistory().push(redirect)
        return <h2>Redirecting...</h2>
    }
    return <Component {...props} />
} 
import React from "react";
import { Navigate } from "react-router";

const Protected = ({isLoggedIn, children}) => {
    //const logged = sessionStorage.getItem("isWalletConnected") === "true"
    //if (isLoggedIn === undefined) return "... LOADING ...";

    //return isLoggedIn || logged ? children : <Navigate to="/" />
    return isLoggedIn ? children : <Navigate to="/" />
}

export default Protected;
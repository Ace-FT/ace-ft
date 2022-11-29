import React from "react";
import { Navigate } from "react-router";

const Protected = ({isLoggedIn, children}) => {
    const logged = sessionStorage.getItem("isWalletConnected") === "true"
    if (isLoggedIn === undefined) return "... LOADING ...";

    return logged ? children : <Navigate to="/" />
}

export default Protected;
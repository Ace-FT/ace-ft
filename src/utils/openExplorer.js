import React, { useContext, useEffect } from "react";
const  EXPLORER_BASEURL =  process.env.REACT_APP_EXPLORER_BASEURL
export function openExplorer(inboxItem) {

    let url ; 
    if (inboxItem.dealid && inboxItem.dealid.trim() != "") { 
       url = EXPLORER_BASEURL + "/deal/" + inboxItem.dealid
    }
    if (!url )
    {
        url = EXPLORER_BASEURL + "/dataset/" + inboxItem.id
    }

    if (url)
    {
       window.open(url, '_blank').focus();
    }

}
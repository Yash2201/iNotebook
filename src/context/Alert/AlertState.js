// import AlertContext from './AlertContext'
// import React, { useState } from 'react'

// const AlertState = (props) => {

//     const [alert, setAlert] = useState({"type":"success","message":"default"});
    
//     const AlertMethod = (alertType, alertMessage) =>{
//         console.log(alertType, alertMessage);
//         setAlert(alertType, alertMessage);
//     }

//     return (
//         <AlertContext.Provider value={{alert,AlertMethod}}>
//                 {props.children}
//         </AlertContext.Provider>
//     )
// }

// export default AlertState


import AlertContext from "./AlertContext";
import { useState } from "react";

const AlertState = (props) => {
    const [alert, setAlert] = useState({"type":"success","messge":"test"})
    return(
        <AlertContext.Provider value={{alert}}>
            {props.children}
        </AlertContext.Provider>

    )
}

export default AlertState;
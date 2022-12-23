import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const s1 = {
        "name":"Yash",
        "class":"5c"
    }

    const [state,setState] = useState(s1);
    const update = () =>{
        setTimeout(() => {
            setState({
                "name":"Nikunj",
                "class":"12a"
            })
        }, 1000);   
    }
    

    return(
        <noteContext.Provider value={{state,update}}>
            {props.children}
        </noteContext.Provider>

    )
}

export default NoteState;
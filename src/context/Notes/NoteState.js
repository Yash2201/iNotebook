import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "639be962c81648ac6d1e5152",
          "user": "639453d9f9c486b9ab5b8212",
          "title": "let's go",
          "description": "ok ok ok ",
          "tag": "genune purpose only",
          "__v": 0
        }
      ]
    
      const [notes, setNotes] = useState(notesInitial)

    return(
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>

    )
}

export default NoteState;
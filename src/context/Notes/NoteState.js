import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "639be962c81648ac6d1e51522",
          "user": "639453d9f9c486b9ab5b8212",
          "title": "let's go",
          "description": "ok ok ok ",
          "tag": "genune purpose only",
          "__v": 0
        },
        {
          "_id": "639be962c81648ac6d1e51532",
          "user": "639453d9f9c486b9ab5b8212",
          "title": "let's go",
          "description": "ok ok ok ",
          "tag": "genune purpose only",
          "__v": 0
        },
        {
          "_id": "639be962c81648ac6d1e515d2",
          "user": "639453d9f9c486b9ab5b8212",
          "title": "let's go",
          "description": "ok ok ok ",
          "tag": "genune purpose only",
          "__v": 0
        },
        {
          "_id": "639be962c81648ac6d1e51f52",
          "user": "639453d9f9c486b9ab5b8212",
          "title": "let's go",
          "description": "ok ok ok ",
          "tag": "genune purpose only",
          "__v": 0
        },
        {
          "_id": "639be962c81648ac6d1e5152a",
          "user": "639453d9f9c486b9ab5b8212",
          "title": "let's go",
          "description": "ok ok ok ",
          "tag": "genune purpose only",
          "__v": 0
        },
        {
          "_id": "639be962c81648ac6d1e5152s",
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
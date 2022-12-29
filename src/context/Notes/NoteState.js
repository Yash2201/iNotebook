import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    let notesInitial = [];

      // Fetch All notes
      const getAllNotes = async () => {
        //API call
        const response = await fetch(`${host}/api/note/fetchallnote`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5NDUzZDlmOWM0ODZiOWFiNWI4MjEyIn0sImlhdCI6MTY3MDY3MjM4Mn0.chgLb6u9wUMH7h8uRNyQKuRNBFcXF2NSaHkgRz02LQQ"
          },
        });
        const json = await response.json();
        setNotes(json);
      }
    
      // Initial the State
      const [notes, setNotes] = useState(notesInitial);
      
      // Add a note 
      const addNote = async (title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/note/addnote`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5NDUzZDlmOWM0ODZiOWFiNWI4MjEyIn0sImlhdCI6MTY3MDY3MjM4Mn0.chgLb6u9wUMH7h8uRNyQKuRNBFcXF2NSaHkgRz02LQQ"
          },
          body: JSON.stringify({title,description,tag}) 
        });
       
        // Adding the note at front End
        const note = await response.json();
        setNotes(notes.concat(note));
      }

      // Edit a note
      const editNote = async (id, title, description, tag) =>{
        // API Call
        const response = await fetch(`${host}/api/note/updatenote/${id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5NDUzZDlmOWM0ODZiOWFiNWI4MjEyIn0sImlhdCI6MTY3MDY3MjM4Mn0.chgLb6u9wUMH7h8uRNyQKuRNBFcXF2NSaHkgRz02LQQ"
          },
          body: JSON.stringify({title,description,tag}) 
        });

        let NewNote = JSON.parse(JSON.stringify(notes));

        // Logic To edit the note at client
        for (let index = 0; index < NewNote.length; index++) {
            const element = NewNote[index];
            
            if(element._id === id)
            {
              NewNote[index].title = title;
              NewNote[index].description = description;
              NewNote[index].tag = tag;
              break;
            }
        }
        setNotes(NewNote);
      }      

      // Delete a note
      const deleteNote = async (id) =>{
        //API call
        const response = await fetch(`${host}/api/note/deletenote/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5NDUzZDlmOWM0ODZiOWFiNWI4MjEyIn0sImlhdCI6MTY3MDY3MjM4Mn0.chgLb6u9wUMH7h8uRNyQKuRNBFcXF2NSaHkgRz02LQQ"
          }
        });

        // Logic to Delete note at client
        const newNote = notes.filter((note)=>{return note._id !== id});
        setNotes(newNote);
      }

    return(
        <noteContext.Provider value={{notes, addNote, editNote, deleteNote, getAllNotes}}>
            {props.children}
        </noteContext.Provider>

    )
}

export default NoteState;
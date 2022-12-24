import React, {useContext} from 'react'
import noteContext from "../context/Notes/noteContext";
import NoteItem from './NoteItem';

function Notes() {
    const context = useContext(noteContext);
    const {notes, setNotes} = context;
    return (
        <div className="row my-3">
            <h1>Your Notes</h1>
            {
                notes.map((note)=>{
                    return <NoteItem key={note._id} note={note}/>
                })
            }    
        </div>
    )
}

export default Notes
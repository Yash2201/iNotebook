import React,{ useContext} from 'react'
import noteContext from "../context/Notes/noteContext";

function NoteItem(props) {
    const {note, updatenote} = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;

    return (
    <div className="col-md-4">  
        <div className="card my-2">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-regular fa-pen-to-square" onClick={()=>{updatenote(note)}}></i>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    </div>
  )
}

export default NoteItem
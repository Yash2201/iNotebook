import React, {useContext, useEffect, useRef, useState} from 'react'
import noteContext from "../context/Notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';

function Notes() {
    const context = useContext(noteContext);
    const {notes,getAllNotes,editNote} = context;
    useEffect(() => {
        getAllNotes();
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({etitle: "", edescription:"",etag:""});

    const handleClick  = (e) => {
        e.preventDefault();
        console.log("updating the note ",note);
        editNote(note.id,note.etitle,note.edescription,note.etag);
        setNote({etitle: "", edescription:"",etag:""});
    }

    const handleChange = (e) => {
        setNote({...note , [e.target.name]: e.target.value});
    }

    const updatenote = (curentNote) => {
        ref.current.click();
        console.log(curentNote);
        setNote({id:curentNote._id,etitle:curentNote.title,edescription:curentNote.description,etag:curentNote.tag});
    }
    const ref = useRef(null);
    return (
        <>
            <AddNote/>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{'display':'none'}}>
            Launch demo modal
            </button>


            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" minLength={5} required onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description </label>
                                    <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" minLength={5} required onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="tag">Tag</label>
                                    <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" data-bs-dismiss="modal" onClick={handleClick} className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Showing The Notes */}
            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container">
                    {notes.length === 0 && 'No Notes To Display'}
                </div>
                {
                    notes.map((note)=>{
                        return <NoteItem key={note._id} updatenote={updatenote} note={note}/>
                    })
                }    
            </div>
        </>        
    )
}

export default Notes
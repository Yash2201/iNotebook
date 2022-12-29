import React, { useContext , useState, useRef } from 'react'
import noteContext from '../context/Notes/noteContext';

function AddNote() {
    const context = useContext(noteContext);
    const {addNote} = context;
    const ref = useRef();

    const [note, setNote] = useState({title: "", description:"",tag:""});

    const handleClick  = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        ref.current.reset();
        setNote({title: "", description:"",tag:""});
    }

    const handleChange = (e) => {
        setNote({...note , [e.target.name]: e.target.value});
    }

    

    return (
    <>
        <div className="container my-3">
            <h1>Add a Note</h1>
            <form ref={ref}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" minLength={5} required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description </label>
                    <input type="text" className="form-control" id="description" name="description" minLength={5} required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag"  onChange={handleChange} />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}> Add Note </button>
            </form>
        </div>
    </>
  )
}

export default AddNote
const express = require("express");
const router = express.Router();
const Note = require("../models/Note"); // Importing the note
const fetchuser = require("../middleware/fetchuser"); // geting the loggedin user's details ->> Middleware
const { body, validationResult } = require("express-validator"); // For Validation Purpose
const jwt = require("jsonwebtoken"); // For Secured Communication Between Client And Server

// Route 1 :- Get All The Notes using GET "/api/note/fetchallnote". Login Required
router.get("/fetchallnote", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }    
});

// Route 2 :- Add a note using POST : "/api/note/addnote". Login Required
router.post(
    "/addnote",
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body(
            "description",
            "Description must be atleast 5 characters"
        ).isLength({ min: 5 }),
    ],
    fetchuser,
    async (req, res) => {
        try {
            // If There are errors, return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, tag } = req.body;

            // Creating a note 
            const note = new Note({
                title, description, tag, user: req.user.id
            });

            const saveNote = await note.save();
            res.json(saveNote);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal server Error");
        }
    }
);

// Route 3 :- Update a note using PUT : "/api/note/updatenote". Login Required
router.put("/updatenote/:id",fetchuser,async (req, res) => {
        try {
            const { title, description, tag} = req.body;

            // creating a newNote Object 
            const newNote = {};
            if(title){newNote.title = title};
            if(description){newNote.description = description};
            if(tag){newNote.tag = tag};

            // Finding the note owner
            const noteOwner = await Note.findById(req.params.id);
            if(!noteOwner){res.status(404).send("Not Found")};

            if(noteOwner.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")};

            const note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true});
            res.json(note);

            
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal server Error");
        }
    }
);


// Route 4 :- Delete a note using Delete : "/api/note/deletenote". Login Required
router.delete("/deletenote/:id",fetchuser,async (req, res) => {
        try {
            // Finding the note owner
            const noteOwner = await Note.findById(req.params.id);
            if(!noteOwner){res.status(404).send("Not Found")};

            if(noteOwner.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")};

            const note = await Note.findByIdAndDelete(req.params.id,);
            if(note){}
            res.json("Note Deleted Successfully");

            
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal server Error");
        }
    }
);

module.exports = router;

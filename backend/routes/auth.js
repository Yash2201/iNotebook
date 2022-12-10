const express = require('express');
const User = require('../models/User')
const route = express.Router();
const bcrypt = require('bcryptjs'); // For Encription Library
const jwt = require('jsonwebtoken'); // For Secured Communication Between Client And Server
const fetchuser = require('../middleware/fetchuser'); // geting the loggedin user's details
const { body, validationResult } = require('express-validator'); // For Validation Purpose

// JWT Signture
const JWT_SECRET = 'YashisGoodB$oy';

// Route 1 : Create a User using: POST "/api/auth/createuser". No Login Required
route.post('/createuser',
    [ body('name','Invalid Name Please Enter a Valid Name').isLength({min: 3}),
      body('password','Password must be atleast 5 characters').isLength({min: 5}),
      body('email','Invalid Email Please Enter a Valid Email').isEmail()],
      async (req,res)=>
    {
    
    // If There are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check Whether the user with this email exists already
        let user = await User.findOne({email: req.body.email});
        if(user)
        {
            return res.status(400).json({"error": "Sorry a user with this email already exists"});
        }

        // Encrypting The Password
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create The New user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
});

// Route 2 : Authenticate a user using: POST "/api/auth/login" No Login Required
route.post('/login',
    [ body('password','Password can not be blank').exists(),
      body('email','Invalid Email Please Enter a Valid Email').isEmail()
    ],async (req,res)=> {
    
    // If There are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email: email});
        if(!user)
        {
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare)
        {
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
});

// Route 3 : Get loggedin user details using: POST "/api/auth/getuser" Login Required
route.post('/getuser', fetchuser, async (req,res)=> {
    
    // If There are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.user.id;
        const user = await User.findOne({userId});
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})    
module.exports = route
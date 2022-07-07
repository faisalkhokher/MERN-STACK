const express = require('express');
const router = express.Router();
const db = require('../DB/conn'); 
const User  = require('../model/userSchema');
const Task  = require('../model/taskSchema');


router.get('/', (req, res) => {
    res.send('Hello World');
});

router.post('/register', (req, res) => {
  
    const {name , email , phone , work , password , cpassword , created_at} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword)
    {
        res.status(400).json({error : "Please fill all the fields"});
    }

    // If user already exists
    // User.findOne({email: email}).then((user) => {
    //     res.status(400).json({error : "Already exists"});
    // });

    const UserObj = new User({
        name,
        email,
        phone,  
        work,
        password,
        cpassword,
        created_at : new Date()
    });

    UserObj.save();
    return res.status(200).json({message : "User created successfully"});
});

router.post('/task', (req, res) => {
    // getting data from request
    const {name , uniqueID} = req.body;
    // if data is not provided
    if(!name || !uniqueID)
    {
        res.status(400).json({error : "Please fill all the fields"});
    }

    const TaskObj = new Task({
        name,
        uniqueID,
    });
    const taskSaved = TaskObj.save();
    if(taskSaved)
    {
        res.status(200).json({message : "task added successfully"});
    }
    
});

router.post('/task', (req, res) => {
    // getting data from request
    const {name , uniqueID} = req.body;
    // if data is not provided
    if(!name || !uniqueID)
    {
        res.status(400).json({error : "Please fill all the fields"});
    }

    const TaskObj = new Task({
        name,
        uniqueID,
    });
    const taskSaved = TaskObj.save();
    if(taskSaved)
    {
        res.status(200).json({message : "task added successfully"});
    }
    
});

router.post('/login' , async (req,res) => {
    // first find user email is exists
    const {email , password} = req.body;
    if(!email || !password)
    {
        res.status(400).json({error : "Please fill all the fields"});
    }
    
   try {
    const userObj = await User.findOne({email: email});
    if(!userObj)
    {
        res.status(400).json({error : "User not found"});
    }
    else
    {
        // just check hash password is correct
        if(userObj.password === password)
        {
            res.status(200).json({message : "Login successful"});
        }
        else
        {
            res.status(400).json({error : "Password is incorrect"});
        }
    }


   } catch (error) {
         res.status(400).json({error : error.message});
   }


});

module.exports = router;
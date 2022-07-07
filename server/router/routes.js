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

    if(!name || !email || !phone || !work || !password || !cpassword || !created_at)
    {
        res.status(400).json({error : "Please fill all the fields"});
    }

    // If user already exists
    User.findOne({email: email}).then((user) => {
        res.status(400).json({error : "Already exists"});
    });

    const UserObj = new User({
        name,
        email,
        phone,  
        work,
        password,
        cpassword,
        created_at,
    });

    UserObj.save();


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

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../DB/conn'); 
const User  = require('../model/userSchema');
const Task  = require('../model/taskSchema');

const bcrypt = require('bcrypt');


router.get('/',  (req, res) => {
    res.send('Hello World');
});

router.post('/register', async(req, res) => {
  
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

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    UserObj.password = await bcrypt.hash(password, salt);
    UserObj.cpassword = await bcrypt.hash(password, salt);
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

    // Create JWT token
    const token  = await userObj.generateAuthToken();
    // if not using token
    // const token = jwt.sign(
    //     { user_id: user._id, email },
    //     process.env.TOKEN_KEY,
    //     {
    //       expiresIn: "2h",
    //     }
    //   );
    //   // save user token
    // user.token = token;
    
 
    res.cookie("access_token", token, {
      httpOnly: true,
      expires : new Date(Date.now() + 1000 * 60 * 60 * 2),
    })
    console.log(token);
 
    if(!userObj)
    {
        res.status(400).json({error : "User not found"});
    }
    else
    {
        const match = await bcrypt.compare(password, userObj.password);
        if(!match)
        {
            return res.status(404).json({error : "Password is incorrect"});
        }
    }

    return res.status(200).json({message : "Login successful"});    
   } catch (error) {
         res.status(400).json({error : error.message});
   }


});

module.exports = router;
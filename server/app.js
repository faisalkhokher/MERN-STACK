 const express = require('express');
 const mongoose = require('mongoose');


 const app = express();
 
 var username = encodeURIComponent(".UwfCg63JH#Z64D");
 const DB = 'mongodb+srv://mern:OaB3FKnUMLHoYu9h@cluster0.rvo3s.mongodb.net/mern?retryWrites=true&w=majority';

 mongoose.connect(DB , { 
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
 }).then((result) => {
    console.log("Connected to MongoDB");
 }).catch((err) => {
    console.log(err);
 });

 app.listen(3000 , ()=> {
     console.log("Server is running on port 3000");
 });

 // Middleware 
 const middleware = (req, res, next) => {
        console.log("Middleware");
        next();
    }

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/about' , middleware , (req, res) => {
    res.send('About Page');
});
require('dotenv').config()
 const express = require('express');
 const mongoose = require('mongoose');


 const app = express();
 
 const PORT = process.env.PORT;
 const mongo_dns = process.env.MONGO_DNS;

 const DB = mongo_dns;

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

 app.listen(PORT , ()=> {
     console.log(`Server is running on port ${PORT}`);
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
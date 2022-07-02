require('dotenv').config()
 const express = require('express');
 const mongoose = require('mongoose');
 // call express
 const app = express();
 
 //! convert obj router to obj express
 app.use(express.json());
 
 //  Connect to router
 app.use(require('./router/routes'));
 
 const PORT = process.env.PORT;
 
 // MongoDB
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



app.get('/about' , middleware , (req, res) => {
    res.send('About Page');
});
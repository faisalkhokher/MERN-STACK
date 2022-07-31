require('dotenv').config()
 const express = require('express');
 const mongoose = require('mongoose');
 const cookieParser = require("cookie-parser");
 // call express
 const app = express();
 
 //! convert obj router to obj express
 app.use(express.json());
 
 //  Connect to router
 app.use(require('./router/routes'));
 app.use(cookieParser());
 
 const PORT = process.env.PORT;
 
 //
 require('./DB/conn');  

    
    
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
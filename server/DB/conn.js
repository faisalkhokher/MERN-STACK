 const mongoose = require('mongoose');
 
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
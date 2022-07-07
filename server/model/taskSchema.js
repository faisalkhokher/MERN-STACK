// 1) first declear mongoose connection
// 2) create mongoose connection schema object
// 3) const Task = mongoose.model('TASK' , TaskSchema)
// 4) create new instance of Task
//  

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    uniqueID : {
        type: String,
        required: true
    }
});

const Task = mongoose.model('TASK' , TaskSchema);
module.exports = Task;
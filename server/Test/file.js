console.log("Connected to fileJS");

const funObj = require('./fun');

function callAPI() { 
    return funObj.add(1 ,1);
 }

console.log("ADD --"+ callAPI()); 
console.log("SUB " + funObj.sub(5 ,1)); 
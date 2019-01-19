const express = require("express");
const app = express();

app.use(express.static(__dirname));

var messages = [
    {name:"Tim", message:"Hey"},
    {name:"Jane", message:"Hullo"}
];

app.get("/messages", (req, res) =>{
    res.send(messages);
});


var server = app.listen(3000, ()=>{
    console.log("Server is listening on PORT-", server.address().port)
})
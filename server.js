const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); 

var messages = [
    {name:"Tim", message:"Hey"},
    {name:"Jane", message:"Hullo"}
];

app.get("/messages", (req, res) =>{
    console.log("Responding...");
    res.send(messages);
});

app.post("/messages", (req, res) =>{
    messages.push(req.body);
    res.sendStatus(200);
});

io.on("connection", (socket)=>{
    console.log("A user connected");
})

var server = http.listen(3000, ()=>{
    console.log("Server is listening on PORT-", server.address().port)
});
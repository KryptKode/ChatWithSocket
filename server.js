const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");

var dbUrl = "mongodb://username:username1@ds161104.mlab.com:61104/chat"


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Message = mongoose.model("Message", {
    name: String,
    message: String
});



app.get("/messages", (req, res) => {

    Message.find({}, (err, data) => {
        if (err)
            console.log("Error occurred", err)
        res.send(data);
    })

});

app.post("/messages", (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if (err)
            sendStatus(500);
        io.emit("message", req.body);
        res.sendStatus(200);
    })

});

io.on("connection", (socket) => {
    console.log("A user connected");
})

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
    console.log("Mongoose connected", err);
})

var server = http.listen(3000, () => {
    console.log("Server is listening on PORT-", server.address().port)
});
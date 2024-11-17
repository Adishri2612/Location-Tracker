const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static('public'));
app.set(express.static(path.join(__dirname, "public"))); // Serve static files from 'public' directory

io.on("connection",function(socket){
    console.log("a new connection");
    socket.on("send-location",function(data){
        io.emit("receive-location",{
            id: socket.id,
            ...data,
        });
    });
    socket.on("disconnect", function(){
        io.emit("user-disconnected",socket.id);
    });
});





app.get("/", function(req, res) {
    res.render("index");
});

server.listen(8000, () => {
    console.log("Server started on port 8000");
});
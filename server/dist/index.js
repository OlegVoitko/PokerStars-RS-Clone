import express from "express";
import { Server } from "socket.io";
import http from "http";
const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.get("/", (req, res) => {
    res.send("hello!");
});
io.on("connection", () => {
    console.log("a user connected");
});
io.emit("open");
server.listen(port, () => {
    console.log(`listening on ${port}`);
});

import express from "express";
import { Server } from "socket.io";
import http from "http";
import mongoose from 'mongoose';

const db = 'mongodb+srv://admin:zzzzzzzz@cluster0.dpzge.mongodb.net/?retryWrites=true&w=majority'


interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
mongoose.connect(db)
.then(() => console.log('db connct'))
.catch((e: Error) => console.log(e));

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server);

app.get("/", (req, res) => {
  res.send("hello!");
});

io.on("connection", () => {
  console.log("a user connected");
});


server.listen(port, () => {
  console.log(`listening on ${port}`);
});

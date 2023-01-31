import express from "express";
import { Server } from "socket.io";
import http from "http";
import mongoose from 'mongoose';
import { userSchema } from './model/model.js';

const db = 'mongodb+srv://admin:zzzzzzzz@cluster0.dpzge.mongodb.net/?retryWrites=true&w=majority'

const User = mongoose.model('User', userSchema);


const port = process.env.PORT || 8000;

const run = async () => {
  const app = express();
  const server = http.createServer(app);
  app.use(express.json()) // for parsing application/json
  app.use(express.urlencoded({ extended: true }))
  try {
    await mongoose.connect(db)
    console.log('db connct');
    const admin = new User({ name: 'Admin', password: '1111', id: 1 });
    console.log(admin.name);
    await admin.save();
    const users = await User.find();
    console.log(users);
  }
  catch (e) {
    console.log(e);
  }
  


  const io = new Server(server);

  app.get("/", (req, res) => {
    res.send("hello!");
  });

  app.post('/users', async (req, res) => {
    const users = await User.find();
    console.log(users);
    const userData = req.body;
    const guess = users.find(
      (u) => u.name === userData.name && u.surname === userData.surname);
    console.log(guess);
    if (guess) {
      res.status(400).send({error: 'User alredy Exist'});
      return;
    }
    const newUser = new User(userData);
    await newUser.save();
    res.status(200).send(newUser);

  });

  io.on("connection", () => {
    console.log("a user connected");
  });


  server.listen(port, () => {
    console.log(`listening on ${port}`);
  });

}

run();

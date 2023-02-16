import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import mongoose from 'mongoose';
import { userSchema } from './model/model.js';
import cors from 'cors';

const db = 'mongodb+srv://admin:zzzzzzzz@cluster0.dpzge.mongodb.net/?retryWrites=true&w=majority';

const User = mongoose.model('User', userSchema);

const port = process.env.PORT || 8000;

const state = {
  messages: [],
  users: [],
};

const run = async () => {
  const app = express();
  const server = http.createServer(app);
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: '*',
    })
  );
  try {
    await mongoose.connect(db);
    console.log('db connct');
    const users = await User.find();
  } catch (e) {
    console.log(e);
  }

  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  app.get('/', (req, res) => {
    res.send('hello!');
  });

  app.post('/signup', async (req, res) => {
    const users = await User.find();
    const userData = req.body;
    const guess = users.find((user) => user.nickname === userData.nickname);

    if (guess) {
      res.status(400).send({ error: 'User already Exist' });
      return;
    }
    const newUser = new User(userData);
    await newUser.save();
    res.status(200).send(newUser);
  });

  app.post('/signin', async (req, res) => {
    const { nickname, password } = req.body;
    const [user] = await User.find({ nickname });
    if (user && user.password === password) {
      // res.status(200).send({ id: user.id });
      res.status(200).send(user);
      return;
    }
    res.status(400).send({ error: 'Invalid login or password' });
  });

  let id = 1;

  io.on('connection', (socket) => {
    console.log('a user connected');
    id++;
    socket.emit('test', id);
    //chat
    socket.on('send', (data) => {
      state.messages.push(data);
      io.emit('new message', data);
    });

    //game
    socket.on('game:seatUser', (user) => {
      console.log('seat');
      state.users.push(user);
      io.emit('game:seatUser', user);
    });
    socket.on('game:seatOutUser', (user) => {
      io.emit('game:seatOutUser', user);
    });
    socket.on('game:checkAction', (data) => {
      io.emit('game:checkAction', data);
    });
    socket.on('game:betAction', (data) => {
      io.emit('game:betAction', data);
    });
    socket.on('game:callAction', (data) => {
      io.emit('game:callAction', data);
    });
    socket.on('game:foldAction', (data) => {
      io.emit('game:foldAction', data);
    });
    socket.on('game:restartDeal', (deck) => {
      io.emit('game:restartDeal', deck);
    });
  });

  server.listen(port, () => {
    console.log(`listening on port: ${port}`);
  });
};

run();

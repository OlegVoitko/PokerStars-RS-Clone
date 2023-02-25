import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import mongoose from 'mongoose';
import { userSchema } from './model/model.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret } from './config.js';

const db = 'mongodb+srv://admin:zzzzzzzz@cluster0.dpzge.mongodb.net/?retryWrites=true&w=majority';

const User = mongoose.model('User', userSchema);

const port = process.env.PORT || 8000;

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: 60 * 60 });
};

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
    const { nickname, password } = req.body;
    const guess = await User.findOne({ nickname });
    if (guess) {
      res.status(400).send({ error: 'User already Exist' });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 6);
    console.log(hashPassword);
    const newUser = new User({ nickname, password: hashPassword, bankroll: 10000 });
    await newUser.save();
    const token = generateAccessToken(newUser._id);
    res.status(200).send({ _id: newUser._id, bankroll: newUser.bankroll, token });
  });

  app.post('/signin', async (req, res) => {
    const { nickname, password } = req.body;
    const user = await User.findOne({ nickname });
    if (!user) {
      return res.status(400).send({ error: 'Invalid login or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).send({ error: 'Invalid login or password' });
    }
    const token = generateAccessToken(user._id);
    res.status(200).send({ _id: user._id, bankroll: user.bankroll, token });
    return;
  });

  io.on('connection', (socket) => {
    //chat
    socket.on('send', (data) => {
      state.messages.push(data);
      io.emit('new message', data);
    });

    //game
    socket.on('game:seatUser', (user) => {
      state.users.push(user);
      console.log(state.users);
      io.emit('game:seatUser', user);
    });
    socket.on('game:seatOutUser', async (user) => {
      state.users = state.users.filter((u) => u._id !== user._id);
      if (user.nickname === 'Guest') {
        return io.emit('game:seatOutUser', user);
      }
      const userDB = await User.findOne({ _id: user._id });
      console.log(userDB);
      userDB.bankroll = user.gameState.stack;
      console.log(userDB);
      await userDB.save();
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
    socket.on('game:restartDeal', ({ deck, usersAtTable, indexOfSB }) => {
      usersAtTable.forEach((u) => {
        const user = state.users.find((user) => user._id === u._id);
        if (user) user.gameState = u.gameState;
      });
      io.emit('game:restartDeal', { deck, usersAtTable: state.users, indexOfSB });
    });
    socket.on('disconnect', () => {
      state.users = state.users.filter((u) => u._id !== socket.handshake.auth.user._id);

      io.emit('game:seatOutUser', socket.handshake.auth.user);
      console.log('-----------------');
    });
  });

  server.listen(port, () => {
    console.log(`listening on port: ${port}`);
  });
};

run();

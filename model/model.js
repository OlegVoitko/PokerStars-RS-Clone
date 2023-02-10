import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  nickname: String,
  password: String,
});
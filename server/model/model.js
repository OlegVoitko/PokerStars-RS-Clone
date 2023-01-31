import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  password: String,
});
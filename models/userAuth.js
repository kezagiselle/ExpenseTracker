import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  otp: {
    type: Number,
    required: true
  },
  otpExpires: {
    type: Date,
    required: true
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  }
});
const userModel = mongoose.model('users', userSchema);
export default userModel;
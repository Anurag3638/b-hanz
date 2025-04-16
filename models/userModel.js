import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type: Number,
    default:0
  }
});

const user = mongoose.model('User', userSchema);

export default user;

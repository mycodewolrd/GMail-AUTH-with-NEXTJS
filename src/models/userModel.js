import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide Username"],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, "please provide Username"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "please provide Username"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
}, 
{ timestamps: true }
);


const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
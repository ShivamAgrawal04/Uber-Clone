import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minLength: [3, "First Name must be at least 3 characters long"],
        maxLength: [100, "First Name must be at least 100 characters less"],
      },
      lastName: {
        lowercase: true,
        type: String,
        trim: true,
        minLength: [3, "Last Name must be at least 3 characters long"],
        maxLength: [100, "Last Name must be at least 100 characters less"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECERET);
  return token;
};

userSchema.methods.comparePassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;

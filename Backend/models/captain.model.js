import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = mongoose.Schema(
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
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        minLength: [3, "Color must be at least 3 chracters long"],
      },
      plate: {
        type: String,
        required: true,
        minLength: [3, "plate must be at least 3 chracter long"],
      },
      capacity: {
        type: Number,
        required: true,
        min: [1, "capacity must be at least 3 chracter long"],
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "motorcycle", "auto"],
      },
    },
    location: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captainSchema", captainSchema);
export default captainModel;

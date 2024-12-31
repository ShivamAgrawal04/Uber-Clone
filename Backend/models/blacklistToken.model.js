import mongoose from "mongoose";
// import userModel from "./user.models";

const blacklistTokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400,
    },
  },
  { timestamps: true }
);

const blacklistModel = mongoose.model("blacklistModel", blacklistTokenSchema);
export default blacklistModel;

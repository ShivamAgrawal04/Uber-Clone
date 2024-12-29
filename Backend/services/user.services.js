import userModel from "../models/user.models.js";

export const createUser = async ({ fullName, email, password }) => {
  if (!fullName || !password || !email) {
    throw new Error("ALl Fields are required");
  }

  //   const existingUser = userModel.findOne({ email });
  //   if (existingUser) {
  //     return res.status(400).json({ message: "User already exist" });
  //   }

  const user = userModel.create({
    fullName: {
      firstName: fullName.firstName,
      lastName: fullName.lastName,
    },
    email,
    password,
  });
  return user;
};

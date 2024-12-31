import captainModel from "../models/captain.model.js";

export const createCaptain = async ({
  fullName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  try {
    if (
      !fullName ||
      !email ||
      !password ||
      !color ||
      !plate ||
      !capacity ||
      !vehicleType
    ) {
      throw new Error("All fields are required");
    }

    const captain = captainModel.create({
      fullName: {
        firstName: fullName.firstName,
        lastName: fullName.lastName,
      },
      email,
      password,
      vehicle: { color, plate, capacity, vehicleType },
    });
    return captain;
  } catch (error) {
    console.log(error);
  }
};

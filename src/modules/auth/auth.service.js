import { BadRequestError, NotFoundException } from "../../common/exceptions/exceptions.js";
import { userModel } from "../../database/index.js";

export const signUp = async (body) => {
  let { firstName,lastName, email, password, gender } = body;
  if (!firstName||!lastName || !email || !password) {
    throw BadRequestError({ message: "All fields are required" });
  }
  let user = await userModel.findOne({email})
  if(user){
     throw NotFoundException({ message: "Invalid email or password" });
  }
  await userModel.insertOne(body);
  return { message: "User registered successfully" };
};

export const login = async (body) => {
  let { email, password } = body;
  if (!email || !password) {
    throw BadRequestError({ message: "All fields are required" });
  }
  const user = await userModel.findOne({ email, password });
  if (!user) {
    throw NotFoundException({ message: "Invalid email or password" });
  }
  return user;
};

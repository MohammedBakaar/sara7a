import {
  BadRequestError,
  NotFoundException,
} from "../../common/exceptions/exceptions.js";
import { userModel } from "../../database/index.js";
import { decryption, encryption, myCompare, myHash } from "../../security/index.js";

export const signUp = async (body) => {
  let { firstName, lastName, email, password, phone } = body;
  if (!firstName || !lastName || !email || !password || !phone) {
    throw BadRequestError({ message: "All fields are required" });
  }
  let user = await userModel.findOne({ email });
  if (user) {
    throw NotFoundException({ message: "Invalid email or password" });
  }
  body.password = await myHash({ plainText: password });
  body.phone = encryption(body.phone)
  return await userModel.insertOne(body);
};

export const login = async (body) => {
  let { email, password } = body;
  if (!email || !password) {
    throw BadRequestError({ message: "All fields are required" });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    throw NotFoundException({ message: "Invalid email or password" });
  }
  let matchPassword = await myCompare({
    plainText: password,
    hash: user.password,
  });
  if (!matchPassword) {
    throw NotFoundException({ message: "Invalid email or password" });
  }
  user.phone = decryption(user.phone)
  return user;
};

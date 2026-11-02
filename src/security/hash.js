import { hash, compare } from "bcrypt";
import argon2 from "argon2";
import { salt } from "../config/config.service.js";

export const myhash = async ({ plainText  }) => {
  return await hash(plainText, salt);
};
export const myCompare = async ({ plainText ,hash}) => {
  return await compare(plainText,hash);
};
export const myArgonHash = async ({ plainText  }) => {
  return await argon2.hash(plainText);
};
export const myArgonCompare = async ({ plainText ,hash}) => {
  return await argon2.verify(hash,plainText);
};



import { config } from "dotenv";
import { resolve } from "node:path";

let ENV_PATH = `.env.${process.env.NODE_ENV}` || ".env.development";
config({
  path: resolve(ENV_PATH),
});
export const port = Number(process.env.PORT);
export const mongo_uri = process.env.MONGO_URI;
export const salt = Number(process.env.SALT);
export const ENC = {
  key: process.env.ENC_KEY,
  ivLength: Number(process.env.ENC_IV_LENGTH),
  algorithm: process.env.ENC_ALGO,
};
export const JWT = {
  user_access_secretKey: process.env.JWT_USER_ACCESS_SECRETKEY,
  user_refresh_secretKey: process.env.JWT_USER_REFRESH_SECRETKEY,
  admin_access_secretKey: process.env.JWT_ADMIN_ACCESS_SECRETKEY,
  admin_refresh_secretKey: process.env.JWT_ADMIN_REFRESH_SECRETKEY,
  access_expTime: Number(process.env.JWT_ACCESS_EXPTIME),
  refresh_expTime: process.env.JWT_REFRESH_EXPTIME,
};

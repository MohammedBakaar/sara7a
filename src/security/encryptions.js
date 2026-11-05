import { ENC } from "../config/config.service.js";
import { randomBytes, createCipheriv, createDecipheriv } from "node:crypto";
let key = Buffer.from(ENC.key, "hex");

export const encryption = (plaintext) => {
  let iv = randomBytes(ENC.ivLength);
  let cipher = createCipheriv(ENC.algorithm, key, iv);
  let result = cipher.update(plaintext, "utf-8", "hex");
  result += cipher.final("hex");
  return `${result}::${iv.toString("hex")}`;
};
export const decryption = (cipherText) => {
  let [ encrypted,hexiv] = cipherText.split("::");
  let iv = Buffer.from(hexiv, "hex");
  let decipher = createDecipheriv(ENC.algorithm, key, iv);
  let result = decipher.update(encrypted, "hex", "utf-8");
  result += decipher.final("utf-8");
  return result;
};

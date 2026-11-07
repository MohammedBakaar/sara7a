import jwt from "jsonwebtoken";
import { JWT } from "../../config/config.service.js";
import { tokenTypeEnum } from "../enums/tokenType.enum.js";
import { roleEnum } from "../enums/role.enum.js";

 const createToken = ({
  payload ,
  options = {},
  secretKey = JWT.user_access_secretKey,
 }) => {
  return jwt.sign(payload, secretKey, options);
 };

const getSecret = ({ tokenType = tokenTypeEnum.access, role = roleEnum.user }) => { // default : access 
  let secrets = getRoleSecret(role)
  return tokenType == tokenTypeEnum.refresh ? secrets.refresh : secrets.access
}
const getRoleSecret = role => {
  let secrets
  switch (role) {
    case roleEnum.admin:
      secrets = {
        access: JWT.admin_access_secretKey,
        refresh : JWT.admin_refresh_secretKey
      }
      break
    default:
      secrets = {
        access : JWT.user_access_secretKey,
        refresh : JWT.user_refresh_secretKey,
      }
  } 
  return secrets
}
export const verifyToken = ({ token, tokenType }) => {
  let { aud } = jwt.decode(token)
  return jwt.verify(token, getSecret({tokenType , role : aud[0]}));
};
export const createTokens = ({ payload, options = {}, role = roleEnum.user }) => {
  let secrets = getRoleSecret(role)
  // user or admin keys
  let accessToken = createToken({
    payload,
    options: { expiresIn: JWT.access_expTime, ...options },
    secretKey:secrets.access,
  });
  let refreshToken = createToken({
    payload,
    options: { expiresIn: JWT.refresh_expTime, ...options },
    secretKey: secrets.refresh,
  });
    return{ accessToken , refreshToken}
};

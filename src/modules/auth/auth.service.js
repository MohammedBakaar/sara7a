import {
  BadRequestError,
  NotFoundException,
  UnauthorizedException,
} from "../../common/exceptions/exceptions.js";
import { JWT } from "../../config/config.service.js";
import {
  createTokens,
  decryption,
  encryption,
  myCompare,
  myHash,
  providerEnum,
  roleEnum,
} from "./../../common/index.js";
import { userRepo } from "../../database/repo/user.repo.js";
import { OAuth2Client } from "google-auth-library";

const Client = new OAuth2Client();

export const signUp = async (body) => {
  body.provider=providerEnum.system
  console.log(body);
  let { firstName, lastName, email, password, phone } = body;
  if (!firstName || !lastName || !email || !password || !phone) {
    throw BadRequestError("All fields are required" );
  }
  let user = await userRepo.findOne({
    filter: { email },
    projection: { email: 1, password: 1 },
  });
  if (user) {
    throw NotFoundException( "Invalid email or password" );
  }
  body.password = await myHash({ plainText: password });
  body.phone = encryption(body.phone);
  
 
  
  return await userRepo.create({ data: body });
};

export const login = async (body ) => {
  
  let { email, password } = body;
  if (!email || !password) {
    throw BadRequestError("All fields are required" );
  }
  const user = await userRepo.findOne({ filter: { email } });
  if (!user) {
    throw NotFoundException("Invalid email or password" );
  }
  let matchPassword = await myCompare({
    plainText: password,
    hash: user.password,
  });
  if (!matchPassword) {
    throw NotFoundException( "Invalid email or password" );
  }
  user.phone = decryption(user.phone);
  let tokens = createTokens({
    payload: { sub: user.id },
    options: { audience: [user.role] },
    role: user.role,
  });
  return tokens;
};
export const rotateToken = (user, payload) => {
  let accessIAT = payload.iat * 1000;
  let accessEXPIN = JWT.access_expTime * 1000;
  let accessEXPAT = accessIAT + accessEXPIN;
  let now = Date.now();
  if (now < accessEXPAT) BadRequestError("token is still active" );
  let { accessToken } = createTokens({ payload: { sub: user.id } });
  return accessToken;
};
export const loginWithGmail = async (data) => {
  const token = await Client.verifyIdToken({
    idToken: data.idToken,
  });
  let { sub, email_verified, email, given_name, family_name, picture } =
    token.getPayload();
  const userId = sub;
  if (!email_verified) {
    UnauthorizedException( "Email is not verified" );
  }
  let user =await  userRepo.findOne({ filter: email });
  let status = 200;
  if (!user) {
    user = await userRepo.create({
      data: {
        firstName: given_name,
        lastName: family_name,
        email,
        image: picture,
        provider: providerEnum.google,
      },
    });
    status = 201;
  }
  return {
    tokens: createTokens({
      payload: { sub: user.id },
      options: { audience: [user.role] },
      role: user.role,
    }),
    status,
  };
};

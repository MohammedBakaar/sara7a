import { userModel } from "../../database/index.js";
import { tokenTypeEnum } from "../enums/tokenType.enum.js";
import { BadRequestError } from "../exceptions/exceptions.js";
import { verifyToken } from "../security/index.js";

export const auth = ({tokenType = tokenTypeEnum.access}) => {
    return async (req, res, next) => {
      let token = req.headers.authorization;
      if (!token) BadRequestError("token is not provided");
      let payload = verifyToken({ token, tokenType });
      req.user = await userModel.findById(payload.sub);
      req.payload = payload
      next();
    };
};

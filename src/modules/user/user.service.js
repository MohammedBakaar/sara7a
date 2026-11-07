import { NotFoundException } from "../../common/exceptions/exceptions.js";
import { verifyToken } from "../../common/index.js";
import { userModel } from "../../database/index.js";


export const updateUser = async (user, data) => {
  return await userModel.findByIdAndUpdate(user.id, data);
};

import { NotFoundException } from "../../common/exceptions/exceptions.js";
import { verifyToken } from "../../common/index.js";
import { userRepo } from "../../database/repo/user.repo.js";


export const updateUser = async (user, data) => {
  return await userRepo.findByIdAndUpdate({ id :user.id,update : data });
};

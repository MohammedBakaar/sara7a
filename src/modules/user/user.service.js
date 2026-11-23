import { NotFoundException } from "../../common/exceptions/exceptions.js";
import { verifyToken } from "../../common/index.js";
import { userRepo } from "../../database/repo/user.repo.js";


export const updateUser = async (user, data) => {
  return await userRepo.findByIdAndUpdate({ id :user.id,update : data });
};
export const getUserProfile = async(id) => {
  let user = await userRepo.findById({ id, projection: { password: 0, __v: 0, role: 0, provider: 0 } })
  if (!user) {
    NotFoundException()
  }
  return user
}

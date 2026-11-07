import { Router } from "express";
import { auth, authentication, response, roleEnum, tokenTypeEnum } from "../../common/index.js";
import * as userService from "./user.service.js";
export const userController = Router();

userController.get("/profile",auth({tokenType : tokenTypeEnum.access}),authentication(roleEnum.user), async (req, res) => {
  response({
    res,
    status: 200,
    data: req.user,
    message: "Profile fetched successfully",
  });
});
userController.get("/admin-profile",auth({tokenType : tokenTypeEnum.access}),authentication(roleEnum.admin), async (req, res) => {
  response({
    res,
    status: 200,
    data: req.user,
    message: "Profile fetched successfully",
  });
});
userController.put("/update", auth({tokenType : tokenTypeEnum.access}), async (req, res) => {
  let result = await userService.updateUser(req.user,req.body);
  response({
    res,
    status: 201,
    data: result,
    message: "User updated successfully",
  });
});
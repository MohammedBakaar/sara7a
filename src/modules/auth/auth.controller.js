import { Router } from "express";
import { response } from "../../common/index.js";
import * as authservice from "./auth.service.js";
export const authController = Router();

authController.post("/signup", async (req, res) => {
  let result = await authservice.signUp(req.body);
  response({
    res,
    status: 201,
    data: result,
    message: "User created successfuly",
  });
});
authController.post("/login", async (req, res) => {
  let result = await authservice.login(req.body);
  response({
    res,
    status: 200,
    data: result,
    message: "you loged in successfully",
  });
});

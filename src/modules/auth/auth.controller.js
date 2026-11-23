import { Router } from "express";
import { auth, response, tokenTypeEnum , authentication , validation} from "../../common/index.js";
import * as authservice from "./auth.service.js";
import { loginSchema, signUpSchema } from "./auth.validation.js";
export const authController = Router();

authController.post("/signup",validation(signUpSchema), async (req, res) => {
  let result = await authservice.signUp(req.validate.body);
  response({
    res,
    status: 201,
    data: result,
    message: "User created successfully",
  });
});

authController.post("/login",validation(loginSchema) ,async (req, res) => {
  let result = await authservice.login(req.validate.body);
  response({
    res,
    status: 200,
    data: result,
    message: "you logged in successfully",
  });
});
authController.post("/loginWithGmail", async (req, res) => {
  let {tokens , status} = await authservice.loginWithGmail(req.body);
  response({
    res,
    status,
    data: tokens,
    message: status == 200 
      ? "you logged in successfully"
      : "User created successfully",
  });
});
authController.get("/rotate-token", auth({ tokenType: tokenTypeEnum.refresh }), (req, res) => {
    let payload = req.payload
    let result =  authservice.rotateToken(req.user , payload);
    response({
      res,
      status: 200,
      data: result,
      message: "new access token returned",
    });
  })


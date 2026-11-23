import z from "zod";
import { generalFields } from "../../common/index.js";


export const loginSchema = (lang = 1) =>
  z.object({
    body: z.strictObject({
      email: generalFields(lang).email,
      password: generalFields(lang).password,
    }),
  });

export const signUpSchema = (lang)=>z.object({
  body: loginSchema().shape.body.safeExtend({
    firstName: generalFields(lang).firstName,
    lastName: generalFields(lang).lastName,
    phone: generalFields(lang).phone,
    gender: generalFields(lang).gender,
  }),
});

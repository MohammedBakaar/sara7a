import z from "zod";
import { genderEnum } from "../enums/index.js";
import { langEnum } from "../enums/lang.enum.js";

export default (lang) => ({
  gender: z.enum(genderEnum),
  firstName: z
    .string()
    .min(5, {
      error:
        lang == langEnum.ar
          ? " الاسم غير صالح "
          : "firstName must be longer than 5 characters",
    }),
  lastName: z
    .string()
    .min(5, {
      error:
        lang == langEnum.ar
          ? " الاسم غير صالح "
          : "lastName must be longer than 5 characters",
    }),
  phone: z.e164(),
  email: z.email(),
  password: z.string().min(5).max(20),
  userId: z.string().length(24),
});

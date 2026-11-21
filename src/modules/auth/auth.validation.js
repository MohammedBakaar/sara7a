import z from "zod";

export const loginSchema = z.strictObject({
  email: z.email(),
  password: z.string().minLength(8),
});

export const signUpSchema = loginSchema.extend({
    firstName : z.string().minLength(5),
    lasttName: z.string().minLength(5),
    phone: z.e164(),
    gender : z.number().min(0).max(1)
});

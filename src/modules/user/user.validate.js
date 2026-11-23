import z from "zod"
import { generalFields } from "../../common/index.js"

export const userProfileSchema =(lang)=> z.object({
  params: z.strictObject({
    userId: generalFields(lang).userId,
  }),
});
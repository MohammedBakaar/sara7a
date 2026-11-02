import { config } from "dotenv";
import {resolve} from "node:path"

let ENV_PATH = `.env.${process.env.NODE_ENV}` || ".env.development"
config(
    {
        path:resolve(ENV_PATH)
    }
)
export const port = Number(process.env.PORT)
export const mongo_uri = process.env.MONGO_URI
export const salt = Number(process.env.SALT)
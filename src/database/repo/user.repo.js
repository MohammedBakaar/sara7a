import { userModel } from "../models/user.model.js";
import { baseRepo } from "./base.repo.js";


export const userRepo = baseRepo(userModel) 
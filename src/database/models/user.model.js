import mongoose from "mongoose";
import { genderEnum } from "../../common/index.js";

let userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [2, "firstName is too short"],
      maxLength: [30, "firstName is too long"],
      required: true,
    },
    lastName: {
      type: String,
      minLength: [2, "lastName is too short"],
      maxLength: [30, "lastName is too long"],
      required: true,
    },
    email: {
      type: String,
      minLength: [2, "email is too short"],
      maxLength: [30, "email is too long"],
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: Number,
      enum: Object.values(genderEnum),
      default: genderEnum.male,
    },
    age: {
      type: Number,
      min: [18, "Age must be bigger than 18 "],
      max: [60, "Age must be smaller than 60 "],
    },
    phone: {
      type: String,
    }
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
    autoIndex: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema
  .virtual("username")
  .set(function (values) {
    let [firstName, lastName] = values.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
  })
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

export const userModel = mongoose.model("User", userSchema);

import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  { 
    sname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    hobbies: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("students", studentSchema);

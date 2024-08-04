import { Student } from "../models/student.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getStudent = async (req, res) => {
  try {
    const student = await Student.find({});
    res.json({ data: student, message: "student fecth successfully..!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const insertStudentData = async (req, res) => {
  console.log("req.body", req.body);
  const { sname, email, password, gender, hobbies } = req.body;

  const secpwd = await bcrypt.hash(password, 10);

  try {
    const result = await Student.create({
      sname,
      password: secpwd,
      email,
      gender,
      hobbies,
    });

    res
      .status(201)
      .json({ data: result, message: "student fetch successfully.!" });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.find({ _id: id });
    res.json({ data: student, message: "student fecth successfully..!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    await Student.findByIdAndDelete({ _id: id });
    res.json({ message: "student delete successfully..!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateStudentData = async (req, res) => {
  const { sname, email, password, gender, hobbies } = req.body;

  const id = req.params.id;

  try {
    const result = await Student.findByIdAndUpdate(
      id,
      {
        sname,
        password,
        email,
        gender,
        hobbies,
      },
      {
        new: true,
      }
    );

    res
      .status(201)
      .json({ data: result, message: "student updated successfully.!" });
  } catch (error) {
    console.log(error);
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });

    if (!student) {
      res.status(500).json({ message: "email not found.!" });
    }

    console.log("==========adfwed");
    const pwd = await bcrypt.compare(password, student.password);

    const token = await jwt.sign( 
      {
        _id: student.id, 
        email: student.email,
      },
      process.env.SECREAT,
      {
        expiresIn: process.env.EXPIRT,
      }
    );

    console.log("token", token);

    if (pwd) {
      res.status(200).json({
        data: student,
        token: token,
        message: "student login successfully.!",
      });
    } else {
      res.status(500).json({ message: "student not found.!" });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

export const changePwd = async (req, res) => {
  try {
    const { email, password, newpassword } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Email not found." });
    }

    const pwdMatch = await bcrypt.compare(password, student.password);

    if (!pwdMatch) {
      return res.status(400).json({ message: "Old password not correct." });
    }

    const newPwd = await bcrypt.hash(newpassword, 10);

    const result = await Student.findByIdAndUpdate(
      student._id,
      { password: newPwd },
      { new: true }
    );

    res
      .status(200)
      .json({ data: result, message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

import { Router } from "express";
import {
  changePwd,
  deleteStudent,
  getSingleStudent,
  getStudent,
  insertStudentData,
  loginStudent,
  updateStudentData,
} from "../controllers/student.controller.js";
 
const router = Router();

router.route("/get").get(getStudent);
router.route("/get/:id").get(getSingleStudent);
router.route("/add").post(insertStudentData);
router.route("/:id").delete(deleteStudent);
router.route("/edit/:id").patch(updateStudentData);

router.route("/login").post(loginStudent);
router.route("/pwd").patch(changePwd);

export default router;

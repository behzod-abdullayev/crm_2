import { Router, type RequestHandler } from "express";
import {
  addStudent,
  deleteStudent,
  getAllStudents,
  getOneStudent,
  leftStudent,
  UpdateStudent,
} from "../controller/student.controller.js";

const studentRouter: Router = Router();

studentRouter.get("/get_all_students", getAllStudents as RequestHandler);
studentRouter.get("/get_one_student", getOneStudent as RequestHandler);
studentRouter.post("/add_student", addStudent as RequestHandler);
studentRouter.put("/update_student", UpdateStudent as RequestHandler);
studentRouter.delete("/delete_student", deleteStudent as RequestHandler);
studentRouter.put("/left_students", leftStudent as RequestHandler);

export default studentRouter;

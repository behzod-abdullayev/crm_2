import { Router } from "express";
import { addStudent, deleteStudent, getAllStudents, getOneStudent, UpdateStudent, } from "../controller/student.controller.js";
const studentRouter = Router();
studentRouter.get("/get_all_students", getAllStudents);
studentRouter.get("/get_one_student", getOneStudent);
studentRouter.post("/add_student", addStudent);
studentRouter.put("/update_student", UpdateStudent);
studentRouter.delete("/delete_student", deleteStudent);
export default studentRouter;
//# sourceMappingURL=student.routes.js.map
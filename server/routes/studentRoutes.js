import { Router } from "express";
const router = Router();
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { downloadCSV } from "../controllers/exportController.js";
import { syncNowByHandle } from "../controllers/adminController.js";

router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

router.get("/export/csv", downloadCSV);

router.post("/sync-now", syncNowByHandle);
export default router;

import { Router } from "express";
import { getCourseDetailsById } from "../controllers/getCourseDetailsByIdController";

export const courseRoute: Router = Router();

courseRoute.get("/:courseId", getCourseDetailsById);

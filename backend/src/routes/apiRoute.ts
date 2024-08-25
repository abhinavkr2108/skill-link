import { Router } from "express";
import {
  postCourseTitle,
  updateCourseTitle,
} from "../controllers/postCourseController";

export const apiRoute: Router = Router();

apiRoute.post("/courses", postCourseTitle);
apiRoute.patch("/courses/:courseId", updateCourseTitle);

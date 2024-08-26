import { Router } from "express";
import {
  addAttachments,
  postCourseTitle,
  updateCourseData,
} from "../controllers/postCourseController";

export const apiRoute: Router = Router();

apiRoute.post("/courses", postCourseTitle);
apiRoute.patch("/courses/:courseId", updateCourseData);
apiRoute.post("/courses/:courseId/attachments", addAttachments);

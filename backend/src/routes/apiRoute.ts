import { Router } from "express";
import {
  addAttachments,
  addChapterTitle,
  postCourseTitle,
  removeAttachment,
  updateCourseData,
} from "../controllers/postCourseController";

export const apiRoute: Router = Router();

apiRoute.post("/courses", postCourseTitle);
apiRoute.patch("/courses/:courseId", updateCourseData);
apiRoute.post("/courses/:courseId/attachments", addAttachments);
apiRoute.delete(
  "/courses/:courseId/attachments/:attachmentId",
  removeAttachment
);
apiRoute.post("/courses/:courseId/chapters", addChapterTitle);

import { Router } from "express";
import { postCourseTitle } from "../controllers/postCourseController";

export const apiRoute: Router = Router();

apiRoute.post("/courses", postCourseTitle);

import { Router } from "express";
import { getAllCategories } from "../controllers/categoryController";

export const categoryRoute: Router = Router();

categoryRoute.get("/", getAllCategories);

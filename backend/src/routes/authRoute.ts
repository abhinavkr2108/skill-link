import { Router } from "express";
import { login } from "../controllers/loginController";

export const authRoute: Router = Router();

authRoute.get("/login", login);

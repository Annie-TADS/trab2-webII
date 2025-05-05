import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get('/', authController.index)
authRouter.get('/logout', authController.logout);

authRouter.post('/login', authController.login);

export default authRouter;
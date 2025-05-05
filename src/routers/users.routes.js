import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const usersRouter = Router();

usersRouter.get('/users', isAuth, usersController.list);
usersRouter.get('/adduser', isAdmin, usersController.createScreen);
usersRouter.get('/adduser/:id', isAuth, usersController.updateScreen);
usersRouter.get('/user/:id', isAuth, usersController.details);

usersRouter.post('/adduser', usersController.create);
usersRouter.post('/updateuser/:id', isAuth, usersController.update);

usersRouter.delete('/deleteuser/:id', isAdmin, usersController.delete);

export default usersRouter;
import { Router } from "express";
import emailsController from '../controllers/emails.controller.js';

const emailsRouter = Router();

emailsRouter.post('/', emailsController.create);

emailsRouter.put('/togglemain/:id', emailsController.toggleMain);

emailsRouter.delete('/:id', emailsController.delete);

export default emailsRouter;
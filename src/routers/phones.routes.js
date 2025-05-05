import { Router } from "express";
import phonesController from '../controllers/phones.controller.js';

const phonesRouter = Router();

phonesRouter.post('/', phonesController.create);

phonesRouter.put('/togglemain/:id', phonesController.toggleMain);

phonesRouter.delete('/:id', phonesController.delete);

export default phonesRouter;
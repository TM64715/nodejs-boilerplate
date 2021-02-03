import { Router } from "express"
import {body} from 'express-validator';
const router = new Router();

import ProjectController from './projects.controller';
import validateBody from '../service/validate.service';
router.get('/all', ProjectController.getAllDocs)

router.post('/new', body("name").notEmpty(), validateBody, ProjectController.createNewDoc)

export default router;
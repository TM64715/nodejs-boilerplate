import { Router } from "express"
const router = new Router();
import ProjectController from './projects.controller';
router.get('/projects', ProjectController.getAllDocs)

router.post('/projects/new', ProjectController.createNewDoc)
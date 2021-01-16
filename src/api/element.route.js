import { Router } from "express"
import ElementController from "./elements.controller";
const router = new Router();

router.post("/save", ElementController.index)
router.get("/all", ElementController.retrieve);
router.delete("/delete", ElementController.deleteById);
export default router;
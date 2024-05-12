import { Router } from "express";
import ParserController from "../controllers/Parser.js";


const router = Router();

router.get("/get-data", ParserController.getData);

export default router;
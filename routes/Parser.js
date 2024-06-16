import { Router } from "express";
import ParserController from "../controllers/Parser.js";
import TokenService from "../services/Token.js";


const router = Router();

router.post("/analyze", TokenService.checkAccess, ParserController.makeAnalyze);
router.post("/analyze-domain", TokenService.checkAccess, ParserController.makeAnalyzeDomain);

export default router;
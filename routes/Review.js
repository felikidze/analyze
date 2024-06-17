import { Router } from "express";
import ReviewController from "../controllers/Review.js";
import TokenService from "../services/Token.js";


const router = Router();

router.get("/get", TokenService.checkAccess, ReviewController.getListReviews);
router.post("/send-message", TokenService.checkAccess, ReviewController.sendMessage);

export default router;
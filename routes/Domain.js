import { Router } from "express";
import DomainController from "../controllers/Domain.js";


const router = Router();

router.get("/get-data", DomainController.getListDomain);

export default router;
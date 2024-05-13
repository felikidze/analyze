import { Router } from "express";
import ScanController from "../controllers/Scan.js";


const router = Router();

router.get("/get-data", ScanController.getListScan);

export default router;
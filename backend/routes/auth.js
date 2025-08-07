import { Router } from "express";
import { authGoogle } from '../controllers/authController.js'
const router = Router();

router.post("/google", authGoogle);

export default router;

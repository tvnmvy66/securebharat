import { Router } from "express";
import {createReport, fetchReport} from "../controllers/reportController.js"

const reportRouter = Router();

reportRouter.post("/create", createReport);
reportRouter.get("/fetch", fetchReport);

export default reportRouter;

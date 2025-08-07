import { Router } from "express";
import { fetchJobs, editJobs } from "../controllers/adminController.js"

const adminRouter = Router();

adminRouter.get("/", fetchJobs);
adminRouter.put("/edit", editJobs);

export default adminRouter;

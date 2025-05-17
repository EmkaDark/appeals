import { Router } from "express";
import appealRouter from "./appeal.route";
const router = Router();

router.use("/api", appealRouter);
export default router;

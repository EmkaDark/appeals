import { Router } from "express";
import { AppealController } from "../controllers/appeal.controller";

const router = Router();

router.post("/appeals", AppealController.createAppeal);
router.patch("/appeals/:id/start", AppealController.startWork);
router.patch("/appeals/:id/complete", AppealController.endAppeal);
router.patch("/appeals/:id/cancel", AppealController.cancelAppeal);
router.get("/appeals", AppealController.getAppeals);
router.post("/appeals/cancel/all", AppealController.cancelAll);

export default router;

import { Router } from "express";
import messageRoutes from "./message.routes";
import webhookRoutes from "./webhook.routes";

const router = Router();

router.use("/api/v1/messages", messageRoutes);
router.use("/webhooks", webhookRoutes);

export default router;

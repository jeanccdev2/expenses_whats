import { Router } from "express";
import container from "../configs/container";
import { TYPES } from "../configs/types";
import { WebhookController } from "../controllers/webhook.controller";
import { EnsureSender } from "../middlewares/ensureSenderIsValid";

const router = Router();
const webhookController = container.get<WebhookController>(
  TYPES.WebhookController
);

router.post("/messages-upsert", EnsureSender.isValid, (req, res) =>
  webhookController.postReceiveMessage(req, res)
);

export default router;

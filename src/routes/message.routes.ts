import { Router } from "express";
import container from "../configs/container";
import { TYPES } from "../configs/types";
import { MessageController } from "../controllers/message.controller";

const router = Router();
const messageController = container.get<MessageController>(
  TYPES.MessageController
);

router.post("/send/:instance", (req, res) => messageController.postSendMessage(req, res));
router.post("/test", (req, res) => messageController.test(req, res));

export default router;

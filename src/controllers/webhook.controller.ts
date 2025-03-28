import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../configs/types";
import { IWebhookService } from "../services/webhook.service";

@injectable()
export class WebhookController {
  private webhookService: IWebhookService;

  constructor(@inject(TYPES.WebhookService) webhookService: IWebhookService) {
    this.webhookService = webhookService;
  }

  async postReceiveMessage(req: Request, res: Response) {
    const { status, data } = await this.webhookService.postReceiveMessage(
      req.body
    );

    res.status(status).json(data);
  }
}

import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../configs/types";
import { IMessageService } from "../services/message.service";

@injectable()
export class MessageController {
  private messageService: IMessageService;

  constructor(@inject(TYPES.MessageService) messageService: IMessageService) {
    this.messageService = messageService;
  }

  async postSendMessage(req: Request, res: Response) {
    const { instance } = req.params;

    await this.messageService.postSendMessage(instance, req.body);

    res.status(200).json({});
  }

  async test(req: Request, res: Response) {
    res.status(200).json({
      response: "Teste",
    });
  }
}

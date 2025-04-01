import { inject, injectable } from "inversify";
import { IMessageBody } from "../types/webhook/message";
import { TYPES } from "../configs/types";
import { IFormat } from "../utils/format.utils";
import { StandardApiResponse } from "../types/api-response";
import { ILogsWebhooksRepository } from "../repositories/logs-webhooks.repository";
import { ISalesRepository } from "../repositories/sales.repository";
import { IAIService } from "../types/webhook/ai";

export interface IWebhookService {
  postReceiveMessage(body: IMessageBody): Promise<StandardApiResponse>;
}

@injectable()
export class WebhookService implements IWebhookService {
  constructor(
    @inject(TYPES.FormatUtils) private formatUtils: IFormat,
    @inject(TYPES.LogsWebhooksRepository)
    private logsWebhooksRepository: ILogsWebhooksRepository,
    @inject(TYPES.SalesRepository)
    private salesRepository: ISalesRepository,
    @inject(TYPES.AIService)
    private aiService: IAIService
  ) {}

  async postReceiveMessage(body: IMessageBody): Promise<StandardApiResponse> {
    try {
      const formattedMessage = this.formatUtils.formatMessageBody(body);

      // await this.logsWebhooksRepository.saveLog(
      //   "postReceiveMessage",
      //   JSON.stringify(body),
      //   JSON.stringify(formattedMessage)
      // );

      const chatResponse = await this.aiService.postSendMessageToChat(
        formattedMessage.message
      );

      if (!chatResponse) {
        return {
          status: 400,
          data: {
            status: 400,
            message: "Dados inválidos para validação",
            response: null,
          },
        };
      }

      // await this.salesRepository.save(
      //   chatResponse.name,
      //   chatResponse.amount,
      //   chatResponse.category,
      //   chatResponse.description
      // );

      return {
        status: 200,
        data: {
          status: 200,
          message: "Webhook recebido",
          response: chatResponse,
        },
      };
    } catch (error) {
      console.error("Error saving webhook", error);

      return {
        status: 500,
        data: {
          status: 500,
          message: "Erro ao salvar webhook",
          response: null,
        },
      };
    }
  }
}

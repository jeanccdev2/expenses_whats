import { Container } from "inversify";
import { TYPES } from "./types";
import { WebhookController } from "../controllers/webhook.controller";
import { IWebhookService, WebhookService } from "../services/webhook.service";
import { Format, IFormat } from "../utils/format.utils";
import { IMessageService, MessageService } from "../services/message.service";
import { MessageController } from "../controllers/message.controller";
import {
  ILogsWebhooksRepository,
  LogsWebhooksRepository,
} from "../repositories/logs-webhooks.repository";
import { IOllamaService, OllamaService } from "../services/ollama.service";
import {
  ISalesRepository,
  SalesRepository,
} from "../repositories/sales.repository";

const container = new Container({ defaultScope: "Singleton" });

// Utils
container.bind<IFormat>(TYPES.FormatUtils).to(Format);

// Repositories
container
  .bind<ILogsWebhooksRepository>(TYPES.LogsWebhooksRepository)
  .to(LogsWebhooksRepository);
container
  .bind<ISalesRepository>(TYPES.SalesRepository)
  .to(SalesRepository);

// Services
container.bind<IWebhookService>(TYPES.WebhookService).to(WebhookService);
container.bind<IMessageService>(TYPES.MessageService).to(MessageService);
container.bind<IOllamaService>(TYPES.OllamaService).to(OllamaService);

// Controllers
container
  .bind<WebhookController>(TYPES.WebhookController)
  .to(WebhookController);
container
  .bind<MessageController>(TYPES.MessageController)
  .to(MessageController);

export default container;

import { injectable } from "inversify";
import { AppDataSource } from "../database/sources/postgres";
import { LogsWebhooks } from "../database/entities/LogsWebhooks";
import { Repository } from "typeorm";

export interface ILogsWebhooksRepository {
  saveLog(functionName: string, body: string, response: string): Promise<void>;
}

@injectable()
export class LogsWebhooksRepository implements ILogsWebhooksRepository {
  private readonly logsWebhookRepository: Repository<LogsWebhooks>;

  constructor() {
    this.logsWebhookRepository = AppDataSource.getRepository(LogsWebhooks);
  }

  async saveLog(
    functionName: string,
    body: string,
    response: string,
    is_error?: boolean
  ): Promise<void> {
    await this.logsWebhookRepository.save({
      function_name: functionName,
      body,
      response,
      is_error,
    });
  }
}

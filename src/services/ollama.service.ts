import { injectable } from "inversify";
import ollama from "ollama";
import { AIMessageResponse, IAIService } from "../types/webhook/ai";

@injectable()
export class OllamaService implements IAIService {
  constructor() {}

  async postSendMessageToChat(message: string): Promise<AIMessageResponse> {
    try {
      const chat = await ollama.chat({
        model: "expenses_whats",
        messages: [{ role: "user", content: message }],
        format: {
          type: "object",
          properties: {
            amount: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            category: {
              type: "string",
            },
            description: {
              type: "string",
            },
          },
          required: ["amount", "name", "category"],
        },
      });

      const response = JSON.parse(chat.message.content);

      return response;
    } catch (error) {
      console.error("Error saving webhook", error);

      return null;
    }
  }
}
